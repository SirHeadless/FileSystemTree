import {handleActions} from "redux-actions";
import {CategoryModel, UrlModel} from "../models";
import {MarkedUrlActions} from "../actions/markedUrl";
import {MarkedCategoryActions} from "../actions/markedCategoryActions";


const initalState = null;
// const initalState  = {discriminator: 'UrlModel', urlId: 6, name: "fsf", url: "sdf", description: "sdfd",
// parentCategoryId: null,
// rating: null};
// const initalState = {discriminator: 'UrlModel', categoryId: null,  urlId: 6, name: "fsf", url: "sdf", description: "sdfd",
//   parentCategoryId: 1,
//   rating: 1,   isExpanded: false, parentId: null};
// const initalState : UrlModel = {discriminator: 'UrlModel',  urlId: 6, name: "fsf", url: "sdf", description: "sdfd",
//   parentCategoryId: 1,
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
