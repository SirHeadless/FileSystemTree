import {createAction} from "redux-actions";
import {FileSystemEntryModel} from "../models";

export namespace FileSystemTreeActions {
  export enum Type {
    LOAD_TREE = 'LOAD_TREE'
  }

  export const loadTree = createAction<FileSystemEntryModel>(Type.LOAD_TREE);
}

export type FileSystemTreeActions = Omit<typeof FileSystemTreeActions, 'Type'>
