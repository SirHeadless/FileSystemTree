import {RootState} from "./state";
import {handleActions} from "redux-actions";
import {FileSystemEntryModel} from "app2/models";
import {FileSystemTreeActions} from "../actions";

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

export const fileSystemEntryReducer = handleActions<RootState.FileSystemEnrtyState, FileSystemEntryModel>(
  {
    [FileSystemTreeActions.Type.LOAD_TREE]: (state, action) => {
      if (action.payload) {
        return [
          {
            id: action.payload.id,
            name: action.payload.name,
            children: action.payload.children,
            type: action.payload.type
          },
          ...state]
      } else {
        return state;
      }
    }
  },
  initalState
);
