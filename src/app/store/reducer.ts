import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './actions'
export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: string | null;
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

export const featureKey = "userReducer";

export const usersReducer = createReducer(
  initialUserState,
  on(UserActions.addUserSuccess, (state, payload) => {
    return adapter.addOne(payload.user, state)
  }),
  on(UserActions.loadUsersSuccess, (state, payload) => {
    return adapter.setAll(payload.users, state)
  }),
);
export const selectUserState = createFeatureSelector<State>(featureKey);
const {
    selectAll,
  } = adapter.getSelectors();
   
  // select the array of user ids
//   export const selectUserIds = selectIds;
   
  // select the dictionary of user entities
//   export const selectUserEntities = selectEntities;
   
  // select the array of users
//   export const selectAllUsers = selectAll;
  export const selectAllUsers = createSelector(
        selectUserState,
        selectAll
      );
   
  // select the total user count
//   export const selectUserTotal = selectTotal;