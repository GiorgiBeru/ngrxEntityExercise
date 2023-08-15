// import {
//     createSelector,
//     createFeatureSelector,
//     ActionReducerMap,
//   } from '@ngrx/store';
//   import * as fromUser from './reducer';
  
//   // export interface State {
//   //   users: fromUser.State;
//   // }
  
//   // export const reducers: ActionReducerMap<State> = {
//   //   users: fromUser.usersReducer,
//   // };
  
//   export const selectUserState = createFeatureSelector<fromUser.State>('userReducer');
  
//   // export const selectUserIds = createSelector(
//   //   selectUserState,
//   //   fromUser.selectUserIds // shorthand for usersState => fromUser.selectUserIds(usersState)
//   // );
//   // export const selectUserEntities = createSelector(
//   //   selectUserState,
//   //   fromUser.selectUserEntities
//   // );
//   export const selectAllUsers = createSelector(
//     selectUserState,
//     fromUser.selectAllUsers
//   );
//   // export const selectUserTotal = createSelector(
//   //   selectUserState,
//   //   fromUser.selectUserTotal
//   // );
//   // export const selectCurrentUserId = createSelector(
//   //   selectUserState,
//   //   fromUser.selectedUserId
//   // );
  
//   // export const selectCurrentUser = createSelector(
//   //   selectUserEntities,
//   //   selectCurrentUserId,
//   //   (userEntities, userId) => userId && userEntities[userId]
//   // );