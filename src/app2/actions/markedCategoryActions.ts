import {createAction} from "redux-actions";
import {CategoryModel} from "../models";

export namespace MarkedCategoryActions {
  export enum Type{
    LOAD_MARKED_CATEGORY = 'LOAD_MARKED_CATEGORY',
    UPDATE_MARKED_CATEGORY = 'UPDATE_MARKED_CATEGORY'
  }

  export const loadMarkedCategory = createAction<CategoryModel>(Type.LOAD_MARKED_CATEGORY);
  export const updateMarkedCategory = createAction<CategoryModel>(Type.UPDATE_MARKED_CATEGORY);
}

export type MarkedCategoryActions = Omit<typeof MarkedCategoryActions, 'Type'>
