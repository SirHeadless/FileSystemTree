import {RouteComponentProps} from "react-router";
import {FileSystemTree} from "../../components";
import {RootState} from "../../reducers";
import * as React from "react";
import {connect} from "react-redux";
import {FileSystemTreeActions} from "../../actions";

import loadTree = FileSystemTreeActions.loadTree
import {Dispatch} from "redux";
import {FileSystemTreeRequests} from "../../utils/fileSystemTreeRequests/fileSystemTreeRequests";
import {CategoryModel} from "../../models/CategoryModel";

namespace MainPage {
  export interface Props extends RouteComponentProps<void> {
    fileSystemEntry: RootState.FileSystemEnrtyState;
    dispatch: Dispatch;
  }

  export interface State {
    fileSystemEntry: RootState.FileSystemEnrtyState;
  }
}

class MainPage extends React.Component<MainPage.Props> {

  constructor(props: MainPage.Props, context?: any) {
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

    const test2 = FileSystemTreeRequests.fullFileSystemTree();


    test2.then(response => {
      console.log("Response:" + response.data);
      const test3 = response.data as CategoryModel;
      this.props.dispatch(loadTree(test3));

    }).catch(error => {
      console.log('Error: ' + error);
    })

    // this.props.dispatch(loadTree(test));

  }

  render() {

    const fileSystemEntry = this.props.fileSystemEntry;
    // const fileSystemEntry = [
    //   {
    //     id: 1,
    //     name: 'ersteCategory',
    //     children: [{
    //       id: 2,
    //       name: 'ersteKindCategory',
    //       children: [],
    //       isCategory: true
    //     },
    //       {
    //         id: 3,
    //         name: 'zweiteKindCategory',
    //         children: [{
    //           id: 1,
    //           name: 'url',
    //           children: [],
    //           isCategory: false
    //         }],
    //         isCategory: true
    //       }
    //     ],
    //     isCategory: true
    //   }];
    return (
      <div id="fileSystemEntryTree">
        <FileSystemTree categories={fileSystemEntry} />
      </div>
     );
  }
}

const mapStateToProps = (state: MainPage.State) => {
  return { fileSystemEntry: state.fileSystemEntry};
}

export default connect(
  mapStateToProps,
)(MainPage)
