import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './reducer';


const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = fromUser.adapter.getSelectors();

export const selectUserState = createFeatureSelector<fromUser.State>(fromUser.userFeatureKey);

export const selectAllUsers = createSelector(selectUserState, selectAll);

export const selectUserEntities = createSelector(selectUserState, selectEntities);

export const selectTotalUsers = createSelector(selectUserState, selectTotal);

export const selectUserIds = createSelector(selectUserState, selectIds);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    createSelector(selectUserState, state => state.selectedUserId),
    (userEntities, selectedUserId) => {
        return selectedUserId ? userEntities[selectedUserId] : null;
    }
)

export const selectCurrentUserSecondWay =  (id: number) => createSelector(selectUserEntities, entities => entities[id]);