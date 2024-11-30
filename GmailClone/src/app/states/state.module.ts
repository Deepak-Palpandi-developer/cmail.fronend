import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { signupReducer } from './signup/signup.reducer';
import { SignUpEffects } from './signup/signup.effects';
import { foldersReducer } from './common/common.reducer';
import { FoldersEffects } from './common/common.effects';
import { mailReducer } from './mails/mail.reducer';
import { MailEffects } from './mails/mail.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),

    // Devtools setup for development only
    !environment.prodution ? StoreDevtoolsModule.instrument() : [],

    // Root effects setup
    EffectsModule.forRoot([]),

    // Feature store for 'auth' and related effects
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),

    // Feature store for 'signup' and related effects
    StoreModule.forFeature('signup', signupReducer),
    EffectsModule.forFeature([SignUpEffects]),

    //mails store
    StoreModule.forFeature('mail', mailReducer),
    EffectsModule.forFeature([MailEffects]),

    //Common store
    StoreModule.forFeature('folders', foldersReducer),
    EffectsModule.forFeature([FoldersEffects]),

    
  ],
})
export class StateModule {}
