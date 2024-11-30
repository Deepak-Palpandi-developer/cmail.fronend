import { createAction, props } from '@ngrx/store';
import { Folders } from '../../models/common.model';

export const loadFolders = createAction('[Folders] Load Folders');

export const loadFoldersSuccess = createAction(
  '[Folders] Load Folders Success',
  props<{ folders: Folders[] }>()
);

export const loadFoldersFailure = createAction(
  '[Folders] Load Folders Failure',
  props<{ error: string }>()
);
