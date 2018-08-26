import {RootState} from "./state";
import {handleActions} from "redux-actions";
import {FileSystemEntryModel} from "app2/models";

const initalState: RootState.FileSystemEnrtyState =[
  {
    id: 1,
    name: 'ersteCategory',
    children: [{
      id: 2,
      name: 'ersteKindCategory',
      children: [],
      isCategory: true
    },
      {
        id: 3,
        name: 'zweiteKindCategory',
        children: [{
          id: 1,
          name: 'url',
          children: [],
          isCategory: false
        }],
        isCategory: true
      }
    ],
    isCategory: true
  }];

export const fileSystemEntryReducer = handleActions<RootState.FileSystemEnrtyState, FileSystemEntryModel>(
  {
  },
  initalState
);
