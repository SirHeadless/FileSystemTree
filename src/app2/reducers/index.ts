import {combineReducers} from "redux";
import {RootState} from "./state";
import {routerReducer, RouterState} from "react-router-redux";
import {categoryReducer} from "./fileSystemEntry";

export {RootState, RouterState}

export const rootReducer = combineReducers<RootState>(
  {
    fileSystemState: categoryReducer as any,
    router: routerReducer as any
  });
