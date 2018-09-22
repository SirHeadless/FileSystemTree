import {createAction} from "redux-actions";
import {FileSystem} from "../models/FileSystem";

export namespace FileSystemTreeActions {
  export enum Type {
    LOAD_CATEGORY_TREE = 'LOAD_CATEGORY_TREE',
    LOAD_URL_TREE = 'LOAD_URL_TREE',
    RELOAD_CATEGORIES = 'RELOAD_CATEGORIES'
  }

  export const loadCategories = createAction<FileSystem>(Type.LOAD_CATEGORY_TREE);
  export const loadUrls = createAction<FileSystem>(Type.LOAD_URL_TREE);
  export const reloadCategories = createAction(Type.RELOAD_CATEGORIES);

}

export type FileSystemTreeActions = Omit<typeof FileSystemTreeActions, 'Type'>
