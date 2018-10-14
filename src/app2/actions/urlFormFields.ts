import {createAction} from "redux-actions";
import {UrlFormFields} from "../models/UrlFormFields";

export namespace UrlFormFieldsActions {
  export enum Type {
    UPDATE_URL_FORM_FIELDS = 'UPDATE_URL_FORM_FIELDS',
  }

  export const updateUrlFormFields = createAction<UrlFormFields>(Type.UPDATE_URL_FORM_FIELDS);

}

export type UrlFormFieldsActions = Omit<typeof UrlFormFieldsActions, 'Type'>
