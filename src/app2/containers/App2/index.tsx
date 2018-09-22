import {RouteComponentProps} from "react-router";
import {FileSystemTree} from "../../components";
import {RootState} from "../../reducers";
import * as React from "react";
import {connect} from "react-redux";
import {FileSystemTreeActions} from "../../actions";

import loadTree = FileSystemTreeActions.loadCategories
import {Dispatch} from "redux";
import {CategoryModel} from "../../models/CategoryModel";
import {CategoryRequests} from "../../utils/categoryRequests/CategoryRequests";
import {UrlRequests} from "../../utils/urlRequests/UrlRequests";
import loadUrls = FileSystemTreeActions.loadUrls;
import {UrlModel} from "../../models";
import {FileSystem} from "../../models/FileSystem";

namespace MainPage {
  export interface Props extends RouteComponentProps<void> {
    fileSystemState: RootState.FileSystemState;
    dispatch: Dispatch;
  }

  export interface State {
    fileSystemState: RootState.FileSystemState;
  }
}

class MainPage extends React.Component<MainPage.Props> {

  constructor(props: MainPage.Props, context?: any) {
    console.log(props);
    super(props, context);
  }

  componentDidMount() {

    // const test = {
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
    // }
    const categoriesRequest = CategoryRequests.allCategories();
    const urlRequest = UrlRequests.allUrls();


    categoriesRequest.then(response => {
      console.log("Response:" + response.data);
      const fileSystemJustWithCategories : FileSystem =
        { categoriesState: response.data as CategoryModel[],
          urlsState : []}

      this.props.dispatch(loadTree(fileSystemJustWithCategories));

    }).catch(error => {
      console.log('Error: ' + error);
    });

    urlRequest.then(response => {
      console.log("Response:" + response.data);
      const fileSystemJustWithUrls : FileSystem =
        { categoriesState: [],
          urlsState : response.data as UrlModel[]}
      this.props.dispatch(loadUrls(fileSystemJustWithUrls));

    }).catch(error => {
      console.log('Error: ' + error);
    });



    // tast2.then(response => {
    //   console.log("Response:" + response.data);
    //   const tast3 = response.data as CategoryModel[];
    //   this.props.dispatch(loadCategories(test3));
    //
    // }).catch(error => {
    //   console.log('Error: ' + error);
    // })

    // this.props.dispatch(loadCategories(test));

  }

  render() {

    const fileSystemState = this.props.fileSystemState;

    // const fileSystemState = this.props.fileSystemState;

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
    // const fileSystemState = {
    //   categoriesState: categories,
    //   urlsState: []
    // }

    return (
      <div id="fileSystem">
        <FileSystemTree categories={fileSystemState.categoriesState} urls={fileSystemState.urlsState} parentId={null} dispatch={this.props.dispatch}/>
      </div>
     );
  }
}

const mapStateToProps = (state: MainPage.State) => {
  return {fileSystemState: state.fileSystemState};
}

export default connect(
  mapStateToProps,
)(MainPage)
