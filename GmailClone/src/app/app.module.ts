import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpCommonService } from './services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { CommonService } from './shared/common.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmAlertComponent } from './aleart-components/confirm-alert/confirm-alert.component';
import { CustomTemplateDirective } from './aleart-components/custom-template.directive';
import { DashBoardModule } from './components/dash-board/dash-board.module';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { StateModule } from './states/state.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmAlertComponent,
    CustomTemplateDirective,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    DashBoardModule,
    StateModule,
  ],
  providers: [
    HttpCommonService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
