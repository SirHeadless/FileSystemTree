import {combineReducers} from "redux";
import {RootState} from "./state";
import {routerReducer, RouterState} from "react-router-redux";
import {fileSystemEntryReducer} from "./fileSystemEntry";

export {RootState, RouterState}

export const rootReducer = combineReducers<RootState>(
  {
    fileSystemEntry: fileSystemEntryReducer as any,
    router: routerReducer as any
  });
