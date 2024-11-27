import { Component } from '@angular/core';
import { HttpCommonService } from '../../../services/http.service';
import { JwtDecode, User } from '../../../models/UserModel';
import { select, Store } from '@ngrx/store';
import { selectUsers } from '../../../state-management/selectors/user.selectors';
import { Observable } from 'rxjs';
import { CommonService } from '../../../shared/common.service';
import { SINGLE_VALUES } from '../../../constants-data/single-values';

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

  userDetails$!: Observable<User | null>;

  constructor(
    private readonly httpService: HttpCommonService<any>,
    private readonly storeService: Store,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.storeService.pipe(select(selectUsers)).subscribe((data) => {
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
  }

  openComposeMail() {
    this.isComposeMail = true;
  }

  closeComposeMail() {
    this.isComposeMail = false;
  }
}
