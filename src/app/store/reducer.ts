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
    return adapter.addMany(payload.users, state)
  }),
  on(UserActions.loadUsersSuccess, (state, payload) => {
    return adapter.setAll(payload.users, state)
  }),
  on(UserActions.setUserSuccess, (state, payload) => {
    return adapter.setOne(payload.user, state)
  }),
  on(UserActions.setUsersSuccess, (state, payload) => {
    return adapter.setMany(payload.users, state)
  }),
  on(UserActions.deleteUserSuccess, (state, payload) => {
    return adapter.removeOne(payload.id, state)
  }),
  on(UserActions.deleteUsersSuccess, (state, payload) => {
    return adapter.removeMany(payload.ids, state)
  }),
  on(UserActions.deleteAllSuccess, (state, payload) => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  }),
  on(UserActions.updateUserSuccess, (state, payload) => {
    return adapter.updateOne(payload.update, state);
  }),
  on(UserActions.updateUsers, (state, payload) => {
    return adapter.updateMany(payload.updates, state);
  }),
  on(UserActions.upsertUser, (state, payload) => {
    return adapter.upsertOne(payload.user, state);
  }),
  on(UserActions.upsertUsers, (state, payload) => {
    return adapter.upsertMany(payload.users, state);
  }),
  on(UserActions.setUserId, (state, payload) => {
    return {
      ...state,
      selectedUserId: payload.userId
    }
  }),
);
