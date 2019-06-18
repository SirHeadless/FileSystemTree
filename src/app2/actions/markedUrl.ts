import {createAction} from "redux-actions";
import {CategoryModel, UrlModel} from "../models";

export namespace MarkedUrlActions {
  export enum Type {
    LOAD_MARKED_URL = 'LOAD_MARKED_URL',
    UPDATE_MARKED_URL = 'UPDATE_MARKED_URL'
  }

  export const loadMarkedUrl = createAction<UrlModel | CategoryModel >(Type.LOAD_MARKED_URL);
  export const updateMarkedUrl = createAction<UrlModel | CategoryModel>(Type.UPDATE_MARKED_URL);

}

export type MarkedUrlActions = Omit<typeof MarkedUrlActions, 'Type'>
