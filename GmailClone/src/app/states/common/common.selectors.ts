import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Folders } from '../../models/common.model';

export interface FoldersState {
  folders: Folders[];
  error: string;
}

export const selectFoldersState =
  createFeatureSelector<FoldersState>('folders');

export const selectAllFolders = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.folders
);

export const selectFoldersError = createSelector(
  selectFoldersState,
  (state: FoldersState) => state.error
);
