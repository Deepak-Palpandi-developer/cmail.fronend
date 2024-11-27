import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { authGuard } from './services/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'dash-board',
    loadChildren: () =>
      import('./components/dash-board/dash-board.module').then(
        (m) => m.DashBoardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
