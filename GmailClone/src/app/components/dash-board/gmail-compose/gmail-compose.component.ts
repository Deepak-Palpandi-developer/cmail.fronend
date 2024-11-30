import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    this.attachments.removeAt(index);
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
    if (this.composeForm.valid) {
      console.log(this.composeForm.value);
      this.store.dispatch(composeMail(this.composeForm.value));
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
      console.log('Form is invalid');
    }
  }

  attachFile() {
    // Logic to attach a file
    console.log('Attachment button clicked');
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
}
