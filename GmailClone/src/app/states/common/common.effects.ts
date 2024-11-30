import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FoldersActions from './common.actions';
import { HttpCommonService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { _connections } from '../../shared/constant-data';

@Injectable()
export class FoldersEffects {
  actions$ = inject(Actions);

  constructor(private httpService: HttpCommonService<any>) {}

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      mergeMap(() =>
        this.httpService
          .postData(environment.mail_box_api, _connections._fetch_folders, '')
          .pipe(
            map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
            catchError((error) =>
              of(FoldersActions.loadFoldersFailure({ error }))
            )
          )
      )
    )
  );
}
