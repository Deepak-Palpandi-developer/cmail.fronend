import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Folders } from '../../../models/common.model';

@Component({
  selector: 'app-gmail-side-bar',
  templateUrl: './gmail-side-bar.component.html',
  styles: ``,
})
export class GmailSideBarComponent {
  @Input() menus!: Folders[];
  @Input() activeMenu: string = '';

  @Output() menuClickEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() composeMail: EventEmitter<boolean> = new EventEmitter<boolean>();

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
