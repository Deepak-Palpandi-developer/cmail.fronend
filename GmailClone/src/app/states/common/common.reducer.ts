import { createReducer, on } from '@ngrx/store';
import { Folders } from '../../models/common.model';
import * as FoldersActions from './common.actions';

export interface FoldersState {
  folders: Folders[];
  error: any;
}

export const initialState: FoldersState = {
  folders: [],
  error: null,
};

export const foldersReducer = createReducer(
  initialState,
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    error: null,
  })),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
