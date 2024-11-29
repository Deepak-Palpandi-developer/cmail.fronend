import { Component } from '@angular/core';
import { HttpCommonService } from '../../../services/http.service';
import { JwtDecode, User } from '../../../models/UserModel';
import { select, Store } from '@ngrx/store';
import { selectUsers } from '../../../state-management/selectors/user.selectors';
import { Observable } from 'rxjs';
import { CommonService } from '../../../shared/common.service';
import { SINGLE_VALUES } from '../../../constants-data/single-values';
import { environment } from '../../../../environments/environment';
import { CONNECTION_PATH_NAMES } from '../../../constants-data/api-path-names';
import { Folders } from '../../../models/Folders';
import { Email } from '../../../models/email';
import { addSenderMails } from '../../../state-management/actions/email.actions';
import { StorePushService } from '../../../shared/store.push.service';
import { StoreGetService } from '../../../shared/store.get.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
})
export class DashBoardComponent {
  logoImage = SINGLE_VALUES.logImage;
  defaultActiveMenu = SINGLE_VALUES.defaultActiveMenu;
  jwtDecode!: JwtDecode;
  userDetails: User | null = null;
  isComposeMail = false;
  menusList!: Folders[];
  emails!: Email[];
  userDetails$!: Observable<User | null>;

  constructor(
    private readonly httpService: HttpCommonService<any>,
    private readonly commonService: CommonService,
    private readonly setorePushService: StorePushService,
    private readonly storeGetService: StoreGetService
  ) {}

  ngOnInit() {
    this.initialLoadDatas();
  }

  getUserDetails() {
    this.storeGetService.getUserDetails().subscribe((data) => {
      if (data) {
        const lastLoginDisplay: any =
          this.commonService.convertUtcToLocalTime(data?.lastLogin ?? '') || '';
        this.userDetails = {
          ...data,
          lastLoginDate: lastLoginDisplay,
          profileImage: SINGLE_VALUES.userDefaultImage,
        };
      }
    });
  }

  setActiveMenu(menu: any) {
    this.defaultActiveMenu = menu;
    if (menu == 'Sent') {
      this.storeGetService.getSenderMais().subscribe((response) => {
        if (response != null && response.length > 0) {
          this.emails = this.emails;
        }
      });
    }
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
    this.getSenderMalis();
    this.setActiveMenu(this.defaultActiveMenu);
  }

  getFolderDetails() {
    this.httpService
      .postData(environment.mail_box_api, CONNECTION_PATH_NAMES.folderApi, '')
      .subscribe((data: Folders[]) => {
        if (data != null && data.length > 0) {
          this.menusList = data;
        }
      });
  }

  getSenderMalis() {
    this.httpService
      .postData(
        environment.mail_box_api,
        CONNECTION_PATH_NAMES.senderMaillsApi,
        {
          email: this.userDetails?.userEmail,
        }
      )
      .subscribe((response) => {
        if (response.isSuccess) {
          this.setorePushService.setSenderMail(response?.data);
        }
      });
  }
}
