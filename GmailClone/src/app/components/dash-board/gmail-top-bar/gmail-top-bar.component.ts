import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/UserModel';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gmail-top-bar',
  templateUrl: './gmail-top-bar.component.html',
  styles: ``,
})
export class GmailTopBarComponent {
  @Input() user: User | null = null;
  @Input() logoImage = '';

  isHovered = false;
  isDropdownOpen = false;

  showDetails(): void {
    this.isHovered = true;
  }

  hideDetails(): void {
    if (!this.isDropdownOpen) {
      this.isHovered = false;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.isHovered = false; // Hide tooltip when dropdown opens
    }
  }
}
