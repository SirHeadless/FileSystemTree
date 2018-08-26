import {RouteComponentProps} from "react-router";
import {FileSystemTree} from "../../components";
import {RootState} from "../../reducers";
import * as React from "react";
import {connect} from "react-redux";

export namespace App2 {
  export interface Props extends RouteComponentProps<void> {
    fileSystemEntry: RootState.FileSystemEnrtyState;
  }
}

@connect(
  (state: RootState): Pick<App2.Props, 'fileSystemEntry'> => {
    // const hash = state.router.location && state.router.location.hash.replace('#', '');
    // const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { fileSystemEntry: state.fileSystemEntry};
  },
  // (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
  //   actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  // })
)

export class App2 extends React.Component<App2.Props> {

  constructor(props: App2.Props, context?: any) {
    super(props, context);
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
      <div>
        <FileSystemTree fileSystemEntries={fileSystemEntry}/>
      </div>
     );
  }
}
