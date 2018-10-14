import {combineReducers} from "redux";
import {RootState} from "./state";
import {routerReducer, RouterState} from "react-router-redux";
import {categoryReducer} from "./fileSystemEntry";
import {markedUrlReducer} from "./markedUrl";
import {urlFormFieldsReducer} from "./urlFormFields";

export {RootState, RouterState}

export const rootReducer = combineReducers<RootState>(
  {
    fileSystemState: categoryReducer as any,
    router: routerReducer as any,
    markedUrlState: markedUrlReducer as any,
    urlFormFields: urlFormFieldsReducer as any
  });
