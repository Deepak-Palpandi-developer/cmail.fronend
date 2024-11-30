import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { Email } from '../../../models/email';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-gmail-view',
  templateUrl: './gmail-view.component.html',
  styles: ``,
})
export class GmailViewComponent {
  @Input() email!: Email;

  commonService = inject(CommonService);

  @Output() backToList = new EventEmitter<boolean>();

  backToListCall() {
    this.backToList.emit();
  }
}
