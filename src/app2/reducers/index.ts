import {combineReducers} from "redux";
import {RootState} from "./state";
import {routerReducer, RouterState} from "react-router-redux";
import {categoryReducer} from "./fileSystemEntry";
import {markedElementReducer} from "./markedUrl";
import {urlFormFieldsReducer} from "./urlFormFields";
import {categoryFormFieldsReducer} from "./categoryFormFields";
import {reducer as reduxFormReducer } from 'redux-form';

export {RootState, RouterState}

export const rootReducer = combineReducers<RootState>(
  {
    fileSystemState: categoryReducer as any,
    router: routerReducer as any,
    markedElementState: markedElementReducer as any,
    urlFormFields: urlFormFieldsReducer as any,
    categoryFormFields: categoryFormFieldsReducer as any,
    form: reduxFormReducer as any
  });
