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
  addUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.addUsers),
      mergeMap((action) => {
        return this.userService.addMany(action.users).pipe(
          map((users: User[]) => userActions.addUsersSuccess({users})),
          catchError(() => of(userActions.addUsersFailure()))
        );
      })
    );
  });
  setUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.setUser),
      mergeMap((action) => {
        return this.userService.setUser(action.user).pipe(
          map((user: User) => userActions.setUserSuccess({user})),
          catchError(() => of(userActions.setUserFailure()))
        );
      })
    );
  });
  deleteUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.deleteUsers),
      mergeMap((action) => {
        return this.userService.deleteUsers(action.ids).pipe(
          map(() => userActions.deleteUsersSuccess({ids: action.ids})),
          catchError(() => of(userActions.deleteUsersFailure()))
        );
      })
    );
  });
  deleteAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.deleteAll),
      mergeMap((action) => {
        return this.userService.deleteAll().pipe(
          map(() => userActions.deleteAllSuccess()),
          catchError(() => of(userActions.deleteAllFailure()))
        );
      })
    );
  });
  setUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.setUsers),
      mergeMap((action) => {
        return this.userService.setUsers(action.users).pipe(
          map((users: User[]) => userActions.setUsersSuccess({users})),
          catchError(() => of(userActions.setUsersFailure()))
        );
      })
    );
  });
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUser),
      mergeMap((action) => {
        return this.userService.updateUser(action.update).pipe(
          map((users: User) => userActions.updateUserSuccess({update: action.update})),
          catchError(() => of(userActions.updateUserFailure()))
        );
      })
    );
  });
  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.deleteUser),
      mergeMap((action) => {
        return this.userService.deleteUser(action.id).pipe(
          map((id: number) => userActions.deleteUserSuccess({id: action.id})),
          catchError(() => of(userActions.deleteUserFailure()))
        );
      })
    );
  });
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() => {
        return this.userService.getAllUsers().pipe(
          map((users: User[]) => userActions.loadUsersSuccess({users})),
          catchError(() => of(userActions.loadUsersFailure()))
        );
      })
    );
  });
}
