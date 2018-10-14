import {createAction} from "redux-actions";
import {UrlModel} from "../models";

export namespace MarkedUrlActions {
  export enum Type {
    LOAD_MARKED_URL = 'LOAD_MARKED_URL',
    UPDATE_MARKED_URL = 'UPDATE_MARKED_URL'
  }

  export const loadMarkedUrl = createAction<UrlModel>(Type.LOAD_MARKED_URL);
  export const updateMarkedUrl = createAction<UrlModel>(Type.UPDATE_MARKED_URL);

}

export type MarkedUrlActions = Omit<typeof MarkedUrlActions, 'Type'>
