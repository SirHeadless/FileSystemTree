import {createAction} from "redux-actions";
import {CategoryFormFields} from "../models/CategoryFormFields";

export namespace CategoryFormFieldsActions {
  export enum Type  {
    UPDATE_CATEGORY_FORM_FIELDS = 'UPDATE_CATEGORY_FORM_FIELDS',
  }

  export const updateCategoryFormFields = createAction<CategoryFormFields>(Type.UPDATE_CATEGORY_FORM_FIELDS);
}

export type CategoryFormFieldsActions = Omit<typeof  CategoryFormFieldsActions, 'Type'>
