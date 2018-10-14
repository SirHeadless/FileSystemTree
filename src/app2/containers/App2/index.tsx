import {RouteComponentProps} from "react-router";
import {FileSystemTree} from "../../components";
import {RootState} from "../../reducers";
import * as React from "react";
import {connect} from "react-redux";
import {FileSystemTreeActions} from "../../actions";
import {Container, Row, Col} from 'react-grid-system';

import loadTree = FileSystemTreeActions.loadCategories
import {Dispatch} from "redux";
import {CategoryModel} from "../../models";
import {CategoryRequests} from "../../utils/categoryRequests/CategoryRequests";
import {UrlRequests} from "../../utils/urlRequests/UrlRequests";
import loadUrls = FileSystemTreeActions.loadUrls;
import {UrlModel} from "../../models";
import {FileSystem} from "../../models/FileSystem";
import {UrlDisplay} from "../../components/UrlDisplay";
import {UrlFormFields} from "../../models/UrlFormFields";

namespace MainPage {
  export interface Props extends RouteComponentProps<void> {
    fileSystemState: RootState.FileSystemState;
    markedUrlState: UrlModel | null;
    urlFormFields: UrlFormFields;
    dispatch: Dispatch;
  }

  export interface State {
    fileSystemState: RootState.FileSystemState;
    markedUrlState: UrlModel;
    urlFormFields: UrlFormFields;
  }
}

class MainPage extends React.Component<MainPage.Props> {

  constructor(props: MainPage.Props, context?: any) {
    console.log(props);
    super(props, context);
  }

  componentDidMount() {

    const categoriesRequest = CategoryRequests.allCategories();
    const urlRequest = UrlRequests.allUrls();


    categoriesRequest.then(response => {
      console.log("Response:" + response.data);
      const fileSystemJustWithCategories: FileSystem =
        {
          categoriesState: response.data as CategoryModel[],
          urlsState: []
        };

      this.props.dispatch(loadTree(fileSystemJustWithCategories));

    }).catch(error => {
      console.log('Error: ' + error);
    });

    urlRequest.then(response => {
      console.log("Response:" + response.data);
      const fileSystemJustWithUrls: FileSystem =
        {
          categoriesState: [],
          urlsState: response.data as UrlModel[]
        };
      this.props.dispatch(loadUrls(fileSystemJustWithUrls));

    }).catch(error => {
      console.log('Error: ' + error);
    });


  }

  render() {

    const fileSystemState = this.props.fileSystemState;
    const markedUrlState = this.props.markedUrlState != null ? {...this.props.markedUrlState} : null;


    return (
      <div id="fileSystem">
        <Container>
          <Row>
            <Col sm={6}>
              <FileSystemTree categories={fileSystemState.categoriesState} urls={fileSystemState.urlsState}
                              parentId={null} dispatch={this.props.dispatch}/>
            </Col>
            {markedUrlState ?
              <Col sm={6}>
                <UrlDisplay displayedUrl={markedUrlState} urlFormFields={this.props.urlFormFields}
                            dispatch={this.props.dispatch} urls={fileSystemState.urlsState}/>
              </Col> : <div></div>
            }
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: MainPage.State) => {
  return {
    fileSystemState: state.fileSystemState,
    markedUrlState: state.markedUrlState,
    urlFormFields: state.urlFormFields
  };
};

export default connect(
  mapStateToProps,
)(MainPage)
