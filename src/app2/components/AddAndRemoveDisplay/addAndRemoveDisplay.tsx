import * as React from "react";
import { UrlModel } from "app2/models/UrlModel";
import { CategoryModel } from "app2/models/CategoryModel";
import { UrlRequests } from "app2/utils/urlRequests/UrlRequests";
import { CategoryRequests } from "app2/utils/categoryRequests/CategoryRequests";
import { FileSystem } from "app2/models/FileSystem";
import { FileSystemTreeActions } from "app2/actions";


import reloadCategories = FileSystemTreeActions.reloadCategories;
import reloadUrls = FileSystemTreeActions.reloadUrls;
import { Dispatch } from "redux";
import { FileSystemUtils } from "app2/utils/fileSystemUtils/fileSystemUtils";


export namespace AddAndRemoveDisplay {
  export interface Props {
    markedElement: UrlModel | CategoryModel;
    categories: CategoryModel[];
    urls: UrlModel[];
    dispatch: Dispatch;
  }
}

export class AddAndRemoveDisplay extends React.Component<AddAndRemoveDisplay.Props> {

  removeElement(markedElement: UrlModel | CategoryModel) {
    var removedResponse;
    if (FileSystemUtils.instanceOfUrlModel(markedElement)) {
      removedResponse = UrlRequests.removeUrl(markedElement.id);

      removedResponse.then(response => {
        console.log("Response:" + response.data);
        const deletedId = response.data as number;
        const newUrlsState = this.props.urls.filter(url => url.id !== deletedId);
    
        const fileSystemJustUrls: FileSystem = {
          categoriesState: [],
          urlsState: newUrlsState
        }
        this.props.dispatch(reloadUrls(fileSystemJustUrls));
      }).catch(error => {
        console.log('Error: ' + error);
      });
    }
    else {
      removedResponse = CategoryRequests.removeCategory(markedElement.id);

      removedResponse.then(response => {
        console.log("Response:" + response.data);
        const deletedId = response.data as number;
        const newCategoryState = this.props.categories.filter(category => category.id !== deletedId);
    
        const fileSystemJustCategories: FileSystem = {
          categoriesState: newCategoryState,
          urlsState: []
        }
        this.props.dispatch(reloadCategories(fileSystemJustCategories));
      }).catch(error => {
        console.log('Error: ' + error);
      });
    }
  }

  render() {
    const markedElement = this.props.markedElement; 


    return (
      <div>
            <button onClick={() => this.removeElement(markedElement)}>Remove</button>
            <button onClick={() => console.log("nix")}>Add</button>
      </div>
    )
  }
}
