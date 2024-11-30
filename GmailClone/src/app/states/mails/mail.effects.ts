import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as MailActions from './mail.actions';
import { HttpCommonService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { _connections } from '../../shared/constant-data';

@Injectable()
export class MailEffects {
  actions$ = inject(Actions);
  constructor(private readonly httpService: HttpCommonService<any>) {}

  loadMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.loadMail),
      mergeMap((action) => {
        const { email, tag } = action;
        let mailObservable;
        switch (tag) {
          case 'sender':
            mailObservable = this.httpService.postData(
              environment.mail_box_api,
              _connections._mail_as_sender,
              { email: email }
            );
            break;
          case 'inbox':
            mailObservable = this.httpService.postData(
              environment.mail_box_api,
              _connections._mail_as_inbox,
              { email: email }
            );
            break;
          case 'trash':
            mailObservable = this.httpService.postData(
              environment.mail_box_api,
              _connections._mail_as_trash,
              { email: email }
            );
            break;
          case 'archive':
            mailObservable = this.httpService.postData(
              environment.mail_box_api,
              _connections._mail_as_archive,
              { email: email }
            );
            break;
          case 'draft':
            mailObservable = this.httpService.postData(
              environment.mail_box_api,
              _connections._mail_as_draft,
              { email: email }
            );
            break;
          default:
            return of(MailActions.loadMailFailure({ error: 'Invalid tag' }));
        }
        return mailObservable.pipe(
          map((response) =>
            MailActions.loadMailSuccess({
              tag,
              mail: response.data,
            })
          ),
          catchError((error) => of(MailActions.loadMailFailure({ error })))
        );
      })
    )
  );

  composeMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.composeMail),
      mergeMap((email) => {
        return this.httpService
          .postData(environment.mail_box_api, _connections._compose_mail, email)
          .pipe(
            map((response) =>
              MailActions.composeMailSuccess({
                tag: 'sender',
                mail: response?.data,
              })
            ),
            catchError((error) => of(MailActions.loadMailFailure({ error })))
          );
      })
    )
  );
}
