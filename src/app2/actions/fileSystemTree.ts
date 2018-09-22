import {createAction} from "redux-actions";
import {FileSystem} from "../models/FileSystem";

export namespace FileSystemTreeActions {
  export enum Type {
    LOAD_CATEGORY_TREE = 'LOAD_CATEGORY_TREE',
    LOAD_URL_TREE = 'LOAD_URL_TREE',
    TOOGLE_CATEGORY_EXPAND = 'TOOGLE_CATEGORY_EXPAND'
  }

  export const loadCategories = createAction<FileSystem>(Type.LOAD_CATEGORY_TREE);
  export const loadUrls = createAction<FileSystem>(Type.LOAD_URL_TREE);
  export const toogleCategoryExpand = createAction(Type.TOOGLE_CATEGORY_EXPAND);

}

export type FileSystemTreeActions = Omit<typeof FileSystemTreeActions, 'Type'>
