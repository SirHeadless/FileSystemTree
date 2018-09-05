import {createAction} from "redux-actions";
import {CategoryModel} from "../models/CategoryModel";

export namespace FileSystemTreeActions {
  export enum Type {
    LOAD_TREE = 'LOAD_TREE'
  }

  export const loadTree = createAction<CategoryModel>(Type.LOAD_TREE);
}

export type FileSystemTreeActions = Omit<typeof FileSystemTreeActions, 'Type'>
