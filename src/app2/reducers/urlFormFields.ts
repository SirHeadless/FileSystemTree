import {handleActions} from "redux-actions";
import {UrlFormFields} from "../models/UrlFormFields";
import {UrlFormFieldsActions} from "../actions/urlFormFields";



const initalState: UrlFormFields  = {


  isNameEditField: false,
  isUrlEditField: false,
  isDescriptionEditField: false,
  isRatingEditField: false

};


export const urlFormFieldsReducer = handleActions<UrlFormFields, UrlFormFields>(
  {
    [UrlFormFieldsActions.Type.UPDATE_URL_FORM_FIELDS]: (state, action) => {
      if (action.payload) {
        return {...state, ...action.payload};
      } else {
        return state;
      }
    },
  },
  initalState
);
