import {RootState} from "./state";
import {handleActions} from "redux-actions";
import {FileSystemTreeActions} from "../actions";
import {FileSystem} from "../models/FileSystem";

// const categories : CategoryModel[] = [{
//           id: 1,
//           name: 'ersteCategory',
//           isExpanded: true,
//           parentId: null
// },
//   {
//     id: 2,
//     name: 'zweiteCategory',
//     isExpanded: false,
//     parentId: 1
//   },
//   {
//     id: 3,
//     name: 'dritteCategory',
//     isExpanded: true,
//     parentId: 1
//   },
//   {
//     id: 4,
//     name: 'vierteCategory',
//     isExpanded: true,
//     parentId: 2
//   }]


const initalState: RootState.FileSystemState = {
  categoriesState: [],
  urlsState: []
};
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

export const categoryReducer = handleActions<RootState.FileSystemState, FileSystem>(
  {
    [FileSystemTreeActions.Type.LOAD_CATEGORY_TREE]: (state, action) => {
      if (action.payload) {
        return {...state, categoriesState: action.payload.categoriesState};
      } else {
        return state;
      }
    },
    [FileSystemTreeActions.Type.LOAD_URL_TREE]: (state, action) => {
      if (action.payload) {
        return {...state, urlsState: action.payload.urlsState};
      } else {
        return state;
      }
    },
  [FileSystemTreeActions.Type.RELOAD_CATEGORIES]: (state, action) => {
    if (action.payload) {
      return {...state, categoriesState: action.payload.categoriesState};
    } else {
      return state;
    }
  },
    [FileSystemTreeActions.Type.RELOAD_URLS]: (state, action) => {
      if (action.payload) {
        return {...state, urlsState: action.payload.urlsState};
      } else {
        return state;
      }
    }
  },

  // {
  //   [FileSystemTreeActions.Type.TOOGLE_CATEGORY_EXPAND]: (state, action) => {
  //     return state.map((category) => {
  //       if (!category || !action || !action.payload) {
  //         return ;
  //       } else {
  //         return (todo.id || 0) === action.payload.id
  //           ? { ...todo, text: action.payload.text }
  //           : todo;
  //       }
  //     });
  //   }
  // },
  initalState
);


// export const urlReducer = handleActions<RootState.FileSystemState, UrlModel[]>(
//   {
//     [FileSystemTreeActions.Type.LOAD_URL_TREE]: (state, action) => {
//       if (action.payload) {
//         return {...state, urlsState: action.payload};
//       } else {
//         return state;
//       }
//     }
//   },
//   // {
//   //   [FileSystemTreeActions.Type.TOOGLE_CATEGORY_EXPAND]: (state, action) => {
//   //     return state.map((category) => {
//   //       if (!category || !action || !action.payload) {
//   //         return ;
//   //       } else {
//   //         return (todo.id || 0) === action.payload.id
//   //           ? { ...todo, text: action.payload.text }
//   //           : todo;
//   //       }
//   //     });
//   //   }
//   // },
//   initalState
// );
