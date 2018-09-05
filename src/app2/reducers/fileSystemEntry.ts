import {RootState} from "./state";
import {handleActions} from "redux-actions";
import {FileSystemTreeActions} from "../actions";
import {CategoryModel} from "../models/CategoryModel";

const initalState: RootState.FileSystemEnrtyState =[];
  // {
  //   id: 1,
  //   name: 'ersteCategory',
  //   children: [{
  //     id: 2,
  //     name: 'ersteKindCategory',
  //     children: [],
  //     type: FileSystemEntryModel.TYPE.CATEGORY
  //   },
  //     {
  //       id: 3,
  //       name: 'zweiteKindCategory',
  //       children: [{
  //         id: 1,
  //         name: 'url',
  //         children: [],
  //         type: FileSystemEntryModel.TYPE.URL
  //       }],
  //       type: FileSystemEntryModel.TYPE.CATEGORY
  //     }
  //   ],
  //   type: FileSystemEntryModel.TYPE.CATEGORY
  // }];

export const fileSystemEntryReducer = handleActions<RootState.FileSystemEnrtyState, CategoryModel>(
  {
    [FileSystemTreeActions.Type.LOAD_TREE]: (state, action) => {
      if (action.payload) {
        return [
          {
            id: action.payload.id,
            name: action.payload.name,
            categoryChildren: action.payload.categoryChildren,
            urlChildren: action.payload.urlChildren,
            fileSystemEntryType: action.payload.fileSystemEntryType
          },
          ...state]
      } else {
        return state;
      }
    }
  },
  initalState
);
