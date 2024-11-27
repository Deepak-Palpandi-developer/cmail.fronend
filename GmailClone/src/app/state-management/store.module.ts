import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { userFeatureKey, userReducer } from './reducer/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.prodution ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(userFeatureKey, userReducer),
  ],
})
export class StoreModules {}
