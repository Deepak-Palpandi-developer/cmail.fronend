import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DROPDOWN_VALUES } from '../../../constants-data/dropdown-values';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gmail-side-bar',
  templateUrl: './gmail-side-bar.component.html',
  styles: ``,
})
export class GmailSideBarComponent {
  @Input() activeMenu: string = '';

  @Output() menuClickEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() composeMail: EventEmitter<boolean> = new EventEmitter<boolean>();

  menus = DROPDOWN_VALUES.menu;

  constructor(private readonly authService: AuthService) {}

  menuClick(menu: string) {
    this.activeMenu = menu;
    this.menuClickEvent.emit(menu);
  }

  openComposeMail() {
    this.composeMail.emit(true);
  }

  logOut(): void {
    this.authService.logout();
  }
}
