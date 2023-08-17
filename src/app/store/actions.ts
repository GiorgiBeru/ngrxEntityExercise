import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { User } from '../models/user.model';

export const loadUsers = createAction('[User/API] Load Users');
export const loadUsersSuccess = createAction('[User/API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User/API] Load Users Failure');
export const setUsers = createAction('[User/API] Set Users', props<{ users: User[] }>());
export const addUser = createAction('[User/API] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User/API] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User/API] Add User Failure');
export const setUserId = createAction('[User/API] Set UserId', props<{ userId: number }>());
export const upsertUser = createAction('[User/API] Upsert User', props<{ user: User }>());
export const addUsers = createAction('[User/API] Add Users', props<{ users: User[] }>());
export const addUsersSuccess = createAction('[User/API] Add Users Success', props<{ users: User[] }>());
export const addUsersFailure = createAction('[User/API] Add Users Failure');
export const upsertUsers = createAction('[User/API] Upsert Users', props<{ users: User[] }>());
export const updateUser = createAction('[User/API] Update User', props<{ update: Update<User> }>());
export const updateUsers = createAction('[User/API] Update Users', props<{ updates: Update<User>[] }>());
export const mapUser = createAction('[User/API] Map User', props<{ entityMap: EntityMapOne<User> }>());
export const mapUsers = createAction('[User/API] Map Users', props<{ entityMap: EntityMap<User> }>());
export const deleteUser = createAction('[User/API] Delete User', props<{ id: string }>());
export const deleteUsers = createAction('[User/API] Delete Users', props<{ ids: string[] }>());
export const deleteUsersByPredicate = createAction('[User/API] Delete Users By Predicate', props<{ predicate: Predicate<User> }>());
export const clearUsers = createAction('[User/API] Clear Users');