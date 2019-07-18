import * as React from "react";
import { Dispatch } from "redux";
import { CategoryModel, UrlModel } from "app2/models";
import { FileSystemUtils } from "app2/utils/fileSystemUtils/fileSystemUtils";
import { CategoryRequests } from "app2/utils/categoryRequests/CategoryRequests";
import { FileSystem } from "app2/models/FileSystem";
import { FileSystemTreeActions } from "app2/actions";
import { AddFileSystemToggleActions } from "app2/actions/addFileSystemToggle";
import AddCategoryForm from "./AddCategoryForm/addCategoryForm";
import AddUrlForm from "./AddUrlForm/addUrlForm";


import reloadCategories = FileSystemTreeActions.reloadCategories;
import reloadUrls = FileSystemTreeActions.reloadUrls;

import toggleAddFileSystem = AddFileSystemToggleActions.toggleAddFileSystem;
import { UrlRequests } from "app2/utils/urlRequests/UrlRequests";



export namespace AddFileSystem {
  export interface Props {
    parentName: String;
    dispatch: Dispatch;
    addFileSystemToggle: Boolean;
    categories: CategoryModel[];
    urls: UrlModel[];
    markedElement: UrlModel | CategoryModel;
  }
}


export class AddFileSystem extends React.Component<AddFileSystem.Props> {

  constructor(props: AddFileSystem.Props, context?: any) {
    super(props, context);
    this.onCategorySubmit = this.onCategorySubmit.bind(this);
    this.onUrlSubmit = this.onUrlSubmit.bind(this);
    this.getParent = this.getParent.bind(this);
    this.toggleAddFileSystem = this.toggleAddFileSystem.bind(this);
  }

  getParent(markedElement: UrlModel | CategoryModel): CategoryModel | null {
    if (FileSystemUtils.instanceOfUrlModel(markedElement)) {
      const parentCategory: CategoryModel | undefined = this.props.categories.find(category => category.id === markedElement.parentId)
      if (parentCategory != undefined) {
        return parentCategory
      }
      return null;
    }
    return markedElement;
  }

  onCategorySubmit(category: CategoryModel) {
    let parent = this.getParent(this.props.markedElement);
    if (parent === null) {
      return;
    }

    category.parentId = parent.id;
    let addPromise = CategoryRequests.addCategory(category);

    addPromise.then(response => {
      let category = response.data as CategoryModel;
      const categories = this.props.categories;
      categories.push(category);

      const fileSystemJustCategories: FileSystem = {
        categoriesState: categories,
        urlsState: []
      }
      this.props.dispatch(reloadCategories(fileSystemJustCategories));
    })
  }

  onUrlSubmit(url: UrlModel) {
    let parent = this.getParent(this.props.markedElement);
    if (parent === null) {
      return;
    }

    url.parentId = parent.id;
    let addPromise = UrlRequests.addUrl(url);

    addPromise.then(response => {
      let url = response.data as UrlModel;
      const urls = this.props.urls;
      urls.push(url);

      const fileSystemJustUrls: FileSystem = {
        categoriesState: [],
        urlsState: urls
      }
      this.props.dispatch(reloadUrls(fileSystemJustUrls));
    })
  }

  toggleAddFileSystem() {
    console.log("Toggle ")
    this.props.dispatch(toggleAddFileSystem())
  }

  render() {
    return (
      <div>
        {this.props.addFileSystemToggle ?
          <div>
            <button onClick={this.toggleAddFileSystem}>Add Url</button>
            <AddCategoryForm parentName={this.props.parentName} dispatch={this.props.dispatch} onSubmit={this.onCategorySubmit} />
          </div>
          :
          <div>
            <button onClick={this.toggleAddFileSystem}>Add Category</button>
            <AddUrlForm parentName={this.props.parentName} dispatch={this.props.dispatch} onSubmit={this.onUrlSubmit} />
          </div>
        }

      </div>
    )
  }


}