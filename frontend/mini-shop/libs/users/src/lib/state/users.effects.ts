import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalstorageService,
    private usersService: UsersService
  ) {}

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();

          if (userId) {
            return this.usersService.getUserById(userId).pipe(
              map((user) => UsersActions.buildUserSessionSuccess({ user })),
              catchError(() => of(UsersActions.buildUserSessionFailure()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailure());
          }
        } else {
          return of(UsersActions.buildUserSessionFailure());
        }
      })
    )
  );
}
