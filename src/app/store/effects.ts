import { Injectable } from "@angular/core";
import * as userActions from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersControllerService } from "../services/users-controller.service";
import { User } from "../models/user.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable({ providedIn: "root" })
export class userEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersControllerService
  ) {}

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.addUser),
      mergeMap((action) => {
        return this.userService.addOne(action.user).pipe(
          map((user: User) => userActions.addUserSuccess({user})),
          catchError(() => of(userActions.addUserFailure()))
        );
      })
    );
  });
}
