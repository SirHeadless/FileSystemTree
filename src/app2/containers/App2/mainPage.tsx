import { RouteComponentProps } from "react-router";
import { FileSystemTree } from "../../components/FileSystemTree/fileSystemTree";
import { RootState } from "../../reducers";
import * as React from "react";
import { connect } from "react-redux";
import { FileSystemTreeActions } from "../../actions";
import { Container, Row, Col } from 'react-grid-system';

import loadTree = FileSystemTreeActions.loadCategories
import { Dispatch } from "redux";
import { CategoryModel } from "../../models";
import { CategoryRequests } from "../../utils/categoryRequests/CategoryRequests";
import { UrlRequests } from "../../utils/urlRequests/UrlRequests";
import loadUrls = FileSystemTreeActions.loadUrls;
import { UrlModel } from "../../models";
import { FileSystem } from "../../models/FileSystem";
import { UrlDisplay } from "../../components/UrlDisplay/urlDisplay";
import { UrlFormFields } from "../../models/UrlFormFields";
import { CategoryDisplay } from "../../components/CategoryDisplay/categoryDisplay";
import { CategoryFormFields } from "../../models/CategoryFormFields";
import { AddAndRemoveDisplay } from "app2/components/components";
import { FileSystemUtils } from "app2/utils/fileSystemUtils/fileSystemUtils";

namespace MainPage {
  export interface Props extends RouteComponentProps<void> {
    fileSystemState: RootState.FileSystemState;
    markedElementState: UrlModel | CategoryModel | null;
    markedCategoryState: CategoryModel | null;
    urlFormFields: UrlFormFields;
    categoryFormFields: CategoryFormFields;
    addFileSystemToggle: Boolean;
    dispatch: Dispatch;
  }

  export interface State {
    fileSystemState: RootState.FileSystemState;
    markedUrlState: UrlModel;
    urlFormFields: UrlFormFields;
    categoryFormFields: CategoryFormFields;
    markedElementState: UrlModel | CategoryModel | null;
    addFileSystemToggle: Boolean;
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
    const markedElementState: UrlModel | CategoryModel | null = this.props.markedElementState != null ? { ...this.props.markedElementState } : null;

    var elementDisplay;
    var addAndRemoveDisplay;
    if (markedElementState != null) {
      if (FileSystemUtils.instanceOfUrlModel(markedElementState)) {
        elementDisplay = <UrlDisplay displayedUrl={markedElementState} urlFormFields={this.props.urlFormFields}
          dispatch={this.props.dispatch} urls={fileSystemState.urlsState} />
      } else {
        elementDisplay = <CategoryDisplay displayedCategory={markedElementState} categoryFormFields={this.props.categoryFormFields}
          dispatch={this.props.dispatch} categories={fileSystemState.categoriesState} />
      }
      addAndRemoveDisplay = <AddAndRemoveDisplay addFileSystemToggle={this.props.addFileSystemToggle} markedElement={markedElementState} categories={fileSystemState.categoriesState} urls={fileSystemState.urlsState} dispatch={this.props.dispatch} />
    } else {
      elementDisplay = <div></div>
      addAndRemoveDisplay = <div>invisible</div>

    }

    return (
      <div id="fileSystem">
        <Container>
          <Row>
            <Col sm={6}>
              <FileSystemTree categories={fileSystemState.categoriesState} urls={fileSystemState.urlsState}
                parentId={null} dispatch={this.props.dispatch} />
            </Col>
            <Col sm={6}>
              {elementDisplay}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {addAndRemoveDisplay}
            </Col>
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
    urlFormFields: state.urlFormFields,
    categoryFormFields: state.categoryFormFields,
    markedElementState: state.markedElementState,
    addFileSystemToggle: state.addFileSystemToggle
  };
};

export default connect(
  mapStateToProps,
)(MainPage)
