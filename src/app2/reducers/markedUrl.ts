import {handleActions} from "redux-actions";
import {CategoryModel, UrlModel} from "../models";
import {MarkedUrlActions} from "../actions/markedUrl";
import {MarkedCategoryActions} from "../actions/markedCategoryActions";


const initalState = null;
// const initalState  = {discriminator: 'UrlModel', id: 6, name: "fsf", url: "sdf", description: "sdfd",
// parentId: null,
// rating: null};
// const initalState = {discriminator: 'UrlModel', id: null,  id: 6, name: "fsf", url: "sdf", description: "sdfd",
//   parentId: 1,
//   rating: 1,   isExpanded: false, parentId: null};
// const initalState : UrlModel = {discriminator: 'UrlModel',  id: 6, name: "fsf", url: "sdf", description: "sdfd",
//   parentId: 1,
//   rating: 1};


export const markedElementReducer = handleActions<CategoryModel | UrlModel| null,  UrlModel | CategoryModel>(
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
    [MarkedCategoryActions.Type.LOAD_MARKED_CATEGORY]: (state, action) =>{
      if (action.payload) {
        return action.payload
      } else {
        return state;
      }
    },
    [MarkedCategoryActions.Type.UPDATE_MARKED_CATEGORY]: (state, action) =>{
      if (action.payload) {
        return {...state, ...action.payload}
      } else {
        return state;
      }
    }
  },
  initalState
);
