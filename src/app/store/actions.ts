import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { User } from '../models/user.model';
//setAll
export const loadUsers = createAction('[User/API] Load Users');
export const loadUsersSuccess = createAction('[User/API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User/API] Load Users Failure');
//addOne - add One entity to the collection
export const addUser = createAction('[User/API] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User/API] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User/API] Add User Failure');
//userId - additional state propery
export const setUserId = createAction('[User/API] Set UserId', props<{ userId: number }>());
//addMany - add Multiple entities to the collection
export const addUsers = createAction('[User/API] Add Users', props<{ users: User[] }>());
export const addUsersSuccess = createAction('[User/API] Add Users Success', props<{ users: User[] }>());
export const addUsersFailure = createAction('[User/API] Add Users Failure');
//setOne - add or replace entities in the collection 
export const setUser = createAction('[User/API] Set User', props<{ user: User }>());
export const setUserSuccess = createAction('[User/API] Set User Success', props<{ user: User }>());
export const setUserFailure = createAction('[User/API] Set User Failure');
//setMany - add or replace entities in the collection
export const setUsers = createAction('[User/API] Set Users', props<{ users: User[] }>());
export const setUsersSuccess = createAction('[User/API] Set Users Success', props<{ users: User[] }>());
export const setUsersFailure = createAction('[User/API] Set Users Failure');
//deleteUser - delete a single entity in the collection
export const deleteUser = createAction('[User/API] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[User/API] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[User/API] Delete User Failure');
//deleteUsers - delete multiple entities in the collection
export const deleteUsers = createAction('[User/API] Delete Users', props<{ ids: number[] }>());
export const deleteUsersSuccess = createAction('[User/API] Delete Users Success', props<{ ids: number[] }>());
export const deleteUsersFailure = createAction('[User/API] Delete Users Failure');
//deleteAll - delete all entities in the collection
export const deleteAll =  createAction('[User/API] Delete All Users');
export const deleteAllSuccess =  createAction('[User/API] Delete All Users Success');
export const deleteAllFailure =  createAction('[User/API] Delete All Users Failure');

export const upsertUser = createAction('[User/API] Upsert User', props<{ user: User }>());
export const upsertUsers = createAction('[User/API] Upsert Users', props<{ users: User[] }>());
export const updateUser = createAction('[User/API] Update User', props<{ update: Update<User> }>());
export const updateUsers = createAction('[User/API] Update Users', props<{ updates: Update<User>[] }>());
export const mapUser = createAction('[User/API] Map User', props<{ entityMap: EntityMapOne<User> }>());
export const mapUsers = createAction('[User/API] Map Users', props<{ entityMap: EntityMap<User> }>());
export const deleteUsersByPredicate = createAction('[User/API] Delete Users By Predicate', props<{ predicate: Predicate<User> }>());
export const clearUsers = createAction('[User/API] Clear Users');