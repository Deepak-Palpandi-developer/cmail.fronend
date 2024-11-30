import { Component } from '@angular/core';
import { User } from '../../../models/UserModel';
import { CommonService } from '../../../shared/common.service';
import { Email } from '../../../models/email';
import { _default_values } from '../../../shared/constant-data';
import { Store } from '@ngrx/store';
import { selectAuthUserDetails } from '../../../states/auth/auth.selectors';
import { Folders } from '../../../models/common.model';
import { loadFolders } from '../../../states/common/common.actions';
import { selectAllFolders } from '../../../states/common/common.selectors';
import { loadMail } from '../../../states/mails/mail.actions';
import { selectMailByTag } from '../../../states/mails/mail.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
})
export class DashBoardComponent {
  logoImage = _default_values._log_image;
  defaultActiveMenu = _default_values._default_active_menu;
  userDetails: User | null = null;
  isComposeMail = false;
  menusList!: Folders[];
  emails!: Email[];

  constructor(
    private readonly commonService: CommonService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.initialLoadDatas();
  }

  getUserDetails() {
    this.store.select(selectAuthUserDetails).subscribe((data) => {
      this.userDetails = {
        ...data,
        profileImage: _default_values._user_default_image,
      };
    });
  }

  setActiveMenu(menu: any) {
    let email = this.userDetails?.userEmail ?? '';
    this.defaultActiveMenu = menu;
    this.getMails(menu, email);
  }

  getMails(tag: string, email: string) {
    this.emails = [];
    const tagMapping: {
      [key: string]: 'sender' | 'inbox' | 'trash' | 'archive' | 'draft';
    } = {
      sent: 'sender',
      inbox: 'inbox',
      trash: 'trash',
      archive: 'archive',
      draft: 'draft',
    };

    const tagKey = tagMapping[tag.toLowerCase()];
    if (!tagKey) {
      console.error('Invalid tag:', tag);
      return;
    }

    this.store
      .select(selectMailByTag(tagKey))
      .pipe(take(1))
      .subscribe((emails) => {
        if (!emails || emails.length === 0) {
          this.store.dispatch(loadMail({ email, tag: tagKey }));

          this.store
            .select(selectMailByTag(tagKey))
            .pipe(
              filter(
                (updatedEmails) => updatedEmails && updatedEmails.length > 0
              ),
              take(1)
            )
            .subscribe((updatedEmails) => {
              this.emails = updatedEmails;
            });
        } else {
          this.emails = emails;
        }
      });
  }

  openComposeMail() {
    this.isComposeMail = true;
  }

  closeComposeMail() {
    this.isComposeMail = false;
  }

  initialLoadDatas() {
    this.getUserDetails();
    this.getFolderDetails();
    // this.getSenderMalis();
    this.setActiveMenu(this.defaultActiveMenu);
  }

  getFolderDetails() {
    this.store.select(selectAllFolders).subscribe((data) => {
      if (data.length > 0) {
        this.menusList = data;
      } else {
        this.store.dispatch(loadFolders());
      }
    });
  }
}
