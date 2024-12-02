import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { composeMail } from '../../../states/mails/mail.actions';

@Component({
  selector: 'app-gmail-compose',
  templateUrl: './gmail-compose.component.html',
  styles: ``,
})
export class GmailComposeComponent {
  @Input() senderMail: string = '';
  @Output() closeComposeMail = new EventEmitter<boolean>();

  @ViewChild('bodyContent') bodyContent!: ElementRef<HTMLDivElement>;

  composeForm!: FormGroup;
  showCcField = false;
  showBccField = false;
  showCcBcc = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.composeForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
      senderEmail: [this.senderMail, [Validators.required, Validators.email]],
      recipientEmail: ['', [Validators.required, Validators.email]],
      cc: [''],
      bcc: [''],
      attachments: this.fb.array([]),
    });
  }

  get attachments(): FormArray {
    return this.composeForm.get('attachments') as FormArray;
  }

  addAttachment(): void {
    const attachmentForm = this.fb.group({
      fileName: [''],
      fileSize: [0],
      mimeType: [''],
      filePath: [''],
      content: [new Uint8Array()],
    });
    this.attachments.push(attachmentForm);
  }

  removeAttachment(index: number): void {
    const attachment = this.attachments.at(index).value;
    const fileName = attachment.fileName;

    // Remove from attachments array
    this.attachments.removeAt(index);

    // Remove attachment info from the body
    const currentBody = this.composeForm.get('body')?.value || '';
    const updatedBody = currentBody.replace(`\n[Attachment: ${fileName}]`, '');
    this.composeForm.get('body')?.setValue(updatedBody);
  }

  closeCompose() {
    this.closeComposeMail.emit(false);
  }

  toggleCcField() {
    this.showCcField = !this.showCcField;
  }

  toggleBccField() {
    this.showBccField = !this.showBccField;
  }

  hideCcBcc() {
    // Delay to prevent hide when clicking Cc/Bcc buttons
    setTimeout(() => {
      if (!this.showCcField && !this.showBccField) {
        this.showCcBcc = false;
      }
    }, 200);
  }

  onSubmit(): void {
    debugger;
    if (this.composeForm.valid) {
      console.log(this.composeForm.value);
      const rawBodyContent = this.composeForm.get('body')?.value || '';
      const cleanedBodyContent = this.sanitizeBodyContent(rawBodyContent);
      const payload = {
        ...this.composeForm.value,
        body: cleanedBodyContent, // Save the sanitized body
      };
      this.store.dispatch(composeMail(payload));
      this.closeCompose();
    } else {
      this.validateAllFormFields(this.composeForm);
      if (this.composeForm.get('recipientEmail')?.invalid) {
        this.toastr.error('Please specify at least one recipient.');
      }
      if (this.composeForm.get('subject')?.invalid) {
        this.toastr.error('Subject is required.');
      }
      if (this.composeForm.get('body')?.invalid) {
        this.toastr.error('Message body is required.');
      }
    }
  }

  attachFile(event: any): void {
    const allowedExtensions = ['pdf', 'doc', 'docx', 'png'];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const file = event.target.files[0];

    if (!file) {
      console.error('No file selected.');
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExtension!)) {
      this.toastr.error(
        'Invalid file type. Only PDF, DOC, DOCX, and PNG files are allowed.'
      );
      return;
    }

    if (file.size > maxFileSize) {
      this.toastr.error('File size exceeds the maximum limit of 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const attachmentForm = this.fb.group({
        fileName: [file.name],
        fileSize: [file.size],
        mimeType: [file.type],
        filePath: [''], // Populate if required for backend
        content: [new Uint8Array(e.target.result)],
      });

      this.attachments.push(attachmentForm);
      console.log(this.composeForm.value);

      const bodyDiv = this.bodyContent.nativeElement;
      const attachmentLink = document.createElement('a');
      attachmentLink.href = '#';
      attachmentLink.textContent = file.name;
      attachmentLink.setAttribute('class', 'attachment-link');
      attachmentLink.setAttribute(
        'data-index',
        `${this.attachments.length - 1}`
      );
      attachmentLink.style.textDecoration = 'underline';
      attachmentLink.style.cursor = 'pointer';

      const attachmentWrapper = document.createElement('span');
      attachmentWrapper.textContent = '[Attachment: ';
      attachmentWrapper.appendChild(attachmentLink);
      attachmentWrapper.appendChild(document.createTextNode('] '));

      bodyDiv.appendChild(attachmentWrapper);
      bodyDiv.appendChild(document.createElement('br'));

      this.composeForm.get('body')?.setValue(bodyDiv.innerHTML); // Add a line break
    };
    reader.readAsArrayBuffer(file);
  }

  onAttachmentClick(index: number): void {
    const attachment = this.attachments.at(index)?.value;
    if (attachment) {
      alert(`File: ${attachment.fileName}\nSize: ${attachment.fileSize} bytes`);
      // Optionally, open a modal for preview
    }
  }

  handleBodyClick(event: any): void {
    if (event.target.classList.contains('attachment-link')) {
      const index = event.target.getAttribute('data-index');
      if (index !== null) {
        this.onAttachmentClick(Number(index));
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.controls.forEach((group: any) =>
          this.validateAllFormFields(group)
        );
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  updateBodyContent(event: any): void {
    const content = event.target.innerHTML;

    // Ensure the input content is processed as LTR
    this.composeForm.get('body')?.setValue(content);
  }

  sanitizeBodyContent(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Remove all attachment links (or any unnecessary elements)
    const attachmentLinks = tempDiv.querySelectorAll('.attachment-link');
    attachmentLinks.forEach((link) => link.parentElement?.remove());

    // Retrieve the cleaned text content (or HTML without attachment-related elements)
    return tempDiv.innerHTML.trim();
  }
}
