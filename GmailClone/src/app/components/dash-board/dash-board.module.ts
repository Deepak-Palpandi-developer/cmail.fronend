import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { GmailSideBarComponent } from './gmail-side-bar/gmail-side-bar.component';
import { GmailTopBarComponent } from './gmail-top-bar/gmail-top-bar.component';
import { GmailActionsComponent } from './gmail-actions/gmail-actions.component';
import { GmailDisplayListComponent } from './gmail-display-list/gmail-display-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GmailComposeComponent } from './gmail-compose/gmail-compose.component';
import { DisplayOrderPipe } from '../../pipes/display-order.pipe';

@NgModule({
  declarations: [
    DashBoardComponent,
    GmailSideBarComponent,
    GmailTopBarComponent,
    GmailActionsComponent,
    GmailDisplayListComponent,
    GmailComposeComponent,
    DisplayOrderPipe,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashBoardModule {}
