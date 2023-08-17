import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './actions'
export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: number | null;
}

export function selectUserId(a: User): number {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: User, b: User): number {
  return a.username.localeCompare(b.username);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialUserState: State = adapter.getInitialState({selectedUserId: null})

export const userFeatureKey = "userReducer";

export const usersReducer = createReducer(
  initialUserState,
  on(UserActions.addUserSuccess, (state, payload) => {
    return adapter.addOne(payload.user, state)
  }),
  on(UserActions.addUsersSuccess, (state, payload) => {
    console.log('add users post req response,', payload.users);
    return adapter.addMany(payload.users, state)
  }),
  on(UserActions.loadUsersSuccess, (state, payload) => {
    return adapter.setAll(payload.users, state)
  }),
  on(UserActions.setUserId, (state, payload) => {
    return {
      ...state,
      selectedUserId: payload.userId
    }
  }),
);
