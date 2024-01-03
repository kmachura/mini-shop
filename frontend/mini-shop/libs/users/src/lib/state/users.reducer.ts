import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
// import * as UsersActions from './users.actions';
import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';


export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User | null,
  isAuthenticated: boolean
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
};

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({...state})),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({...state, user: action.user, isAuthenticated: true })),
  on(UsersActions.buildUserSessionFailure, (state) => ({...state, user: null, isAuthenticated: false })),
)

// const reducer = createReducer(
//   initialUsersState,
//   on(UsersActions.initUsers, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(UsersActions.loadUsersSuccess, (state, { users }) =>
//     usersAdapter.setAll(users, { ...state, loaded: true })
//   ),
//   on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
