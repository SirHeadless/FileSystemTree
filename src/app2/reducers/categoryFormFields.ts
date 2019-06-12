import {CategoryFormFields} from "../models/CategoryFormFields";
import {handleActions} from "redux-actions";
import {CategoryFormFieldsActions} from "../actions/categoryFromFields";

const initalState: CategoryFormFields = {
  isNameEditField: false,
  isDescriptionEditField: false,
};

export const categoryFormFieldsReducer = handleActions<CategoryFormFields, CategoryFormFields>(
  {
    [CategoryFormFieldsActions.Type.UPDATE_CATEGORY_FORM_FIELDS]: (state, action) => {
      if (action.payload) {
        return {...state, ...action.payload}
      } else {
        return state;
      }
    },
  },
  initalState
)
