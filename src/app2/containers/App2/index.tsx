import {RouteComponentProps} from "react-router";
import {FileSystemTree} from "../../components";
import {RootState} from "../../reducers";
import * as React from "react";
import {connect} from "react-redux";
import {FileSystemTreeActions} from "../../actions";
import {FileSystemEntryModel} from "../../models";
import {bindActionCreators, Dispatch} from "redux";
import {omit} from "app2/utils";

export namespace App2 {
  export interface Props extends RouteComponentProps<void> {
    fileSystemEntry: RootState.FileSystemEnrtyState;
    actions: FileSystemTreeActions;
  }
}

@connect(
  (state: RootState): Pick<App2.Props, 'fileSystemEntry'> => {
    // const hash = state.router.location && state.router.location.hash.replace('#', '');
    // const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { fileSystemEntry: state.fileSystemEntry};
  },
  (dispatch: Dispatch): Pick<App2.Props, 'actions'> => ({
    actions: bindActionCreators(omit(FileSystemTreeActions, 'Type'), dispatch)
  })
)


export class App2 extends React.Component<App2.Props> {

  constructor(props: App2.Props, context?: any) {
    super(props, context);
  }

  componentDidMount() {
    const test = {
      id: 1,
      name: 'ersteCategory',
      children: [{
        id: 2,
        name: 'ersteKindCategory',
        children: [],
        type: FileSystemEntryModel.TYPE.CATEGORY
      },
        {
          id: 3,
          name: 'zweiteKindCategory',
          children: [{
            id: 1,
            name: 'url',
            children: [],
            type: FileSystemEntryModel.TYPE.URL
          }],
          type: FileSystemEntryModel.TYPE.CATEGORY
        }
      ],
      type: FileSystemEntryModel.TYPE.CATEGORY
    }

    this.props.actions.loadTree(test);
  }

  render() {

    const fileSystemEntry = this.props.fileSystemEntry;
    const actions = this.props.actions;
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
      <div>
        <FileSystemTree fileSystemEntries={fileSystemEntry} actions={actions}/>
      </div>
     );
  }
}
