import {handleActions} from "redux-actions";
import {UrlModel} from "../models";
import {MarkedUrlActions} from "../actions/markedUrl";



const initalState  = null;


export const markedUrlReducer = handleActions<UrlModel | null, UrlModel>(
  {
    [MarkedUrlActions.Type.LOAD_MARKED_URL]: (state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    },
    [MarkedUrlActions.Type.UPDATE_MARKED_URL]: (state, action) => {
      if (action.payload) {
        return {...state, ...action.payload};
      } else {
        return state;
      }
    },
  },
  initalState
);
