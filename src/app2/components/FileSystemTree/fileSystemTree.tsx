import * as React from "react";
import {Category} from "../Category/category";
import {Url} from "../Url/url";
import * as style from './style.less';
import {CategoryModel} from "../../models/CategoryModel";
import {UrlModel} from "../../models";
import {StoreUtils} from "../../utils/storeUtils/storeUtils";
import {FileSystem} from "../../models/FileSystem";
import {FileSystemTreeActions} from "../../actions";
import reloadCategories = FileSystemTreeActions.reloadCategories;
import {Dispatch} from "redux";
import {UrlRequests} from "../../utils/urlRequests/UrlRequests";
import reloadUrls = FileSystemTreeActions.reloadUrls;
import {CategoryRequests} from "../../utils/categoryRequests/CategoryRequests";
import {MarkedUrlActions} from "../../actions/markedUrl";
import loadMarkedUrl = MarkedUrlActions.loadMarkedUrl;

export namespace FileSystemTree {
  export interface Props {
    categories: CategoryModel[];
    urls: UrlModel[];
    parentId: number | null;
    dispatch: Dispatch;
  }
}

interface DragData{
  id: number
  type: string
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

  toogleExpand(id: number) {
    const categoies: CategoryModel[] = this.props.categories.map(category => {
      if (category.id === id) {
        return {...category, isExpanded: !category.isExpanded}
      }
      return category;
    })
    const fileSystemJustCategories: FileSystem = {
      categoriesState: categoies,
      urlsState: []
    }
    this.props.dispatch(reloadCategories(fileSystemJustCategories));
  }

  markUrl(id: number) {
    const url: UrlModel | undefined = this.props.urls.find(url => {
      return url.id === id;
    })
    console.log(url);
    url && this.props.dispatch(loadMarkedUrl(url));

    // Just for test! If this is missing it will not go to render App2/fileSystemTree.tsx again
    const fileSystemJustWithUrls: FileSystem =
      {
        categoriesState: [],
        urlsState: this.props.urls
      };
    url && this.props.dispatch(reloadUrls(fileSystemJustWithUrls));
  }

  markCategory(id: number) {
    const category: CategoryModel | undefined = this.props.categories.find(category => {
      return category.id === id;
    })
    console.log(category);
    category && this.props.dispatch(loadMarkedUrl(category));

    // Just for test! If this is missing it will not go to render App2/fileSystemTree.tsx again
    const fileSystemJustWithUrls: FileSystem =
      {
        categoriesState: [],
        urlsState: this.props.urls
      };
    category && this.props.dispatch(reloadUrls(fileSystemJustWithUrls));
  }



  onDragOver(e: any, id: number) {
    e.preventDefault();
    const categoryElementOrNull: HTMLElement | null = document.getElementById("Category" + id);

    if (categoryElementOrNull) {
      const categoryElement: HTMLElement = categoryElementOrNull;
      categoryElement.setAttribute("style", "background-color:red");
    }

  }

  onDragLeave(e: any, id: number) {
    e.preventDefault();
    const categoryElementOrNull: HTMLElement | null = document.getElementById("Category" + id);

    if (categoryElementOrNull) {
      const categoryElement: HTMLElement = categoryElementOrNull;
      categoryElement.setAttribute("style", "");
    }
  }

  onDragUrlStart(e: any, id: number) {
    console.log("Dragstart", id);
    const dragData: DragData = {id: id, type: "URL"};
    e.dataTransfer.setData("data", JSON.stringify(dragData));
  }

  onDragCategoryStart(e: any, id: number) {
    console.log("Dragstart", id);
    const dragData: DragData = {id: id, type: "CATEGORY"}
    e.dataTransfer.setData("data", JSON.stringify(dragData));
  }

  onDrop(e: any, parentCategoryid: number) {
    this.onDragLeave(e, parentCategoryid);

    console.log("DROP", parentCategoryid);
    let dragData: DragData = JSON.parse(e.dataTransfer.getData("data"));
    if (dragData.type === "URL") {
      let id = dragData.id;

      const urlToUpdate: UrlModel | undefined = this.props.urls.find(url => {
        return url.id === id
      });

      if (urlToUpdate != undefined) {
        urlToUpdate.parentId = parentCategoryid;
        this.updateUrl(urlToUpdate);
      }
    } else if (dragData.type === "CATEGORY"){
      let categoryToUpdateId = dragData.id;

      const categoryToUpdate: CategoryModel | undefined = this.props.categories.find(category => {
        return category.id === categoryToUpdateId;
      });

      if (categoryToUpdate != undefined) {
        categoryToUpdate.parentId = parentCategoryid;
        this.updateCategory(categoryToUpdate);
      }
    }
  }

  updateUrl(urlModelToUpdate: UrlModel) {
    const urlUpdateRequest = UrlRequests.updateUrl(urlModelToUpdate);

    urlUpdateRequest.then(response => {
      console.log("Response:" + response.data);
      const responseUrl = response.data as UrlModel;
      var urlIndex = this.props.urls.findIndex(url => url.id === responseUrl.id);
      const newUrlState = this.props.urls;
      newUrlState[urlIndex] = responseUrl;

      const fileSystemJustWithUrls: FileSystem =
        {
          categoriesState: [],
          urlsState: newUrlState
        }
      this.props.dispatch(reloadUrls(fileSystemJustWithUrls));
    }).catch(error => {
      console.log('Error: ' + error);
    });
  }

  updateCategory(categoryModelToUpdate: CategoryModel) {
    const categoryUpdateRequest = CategoryRequests.updateCategory(categoryModelToUpdate);

    categoryUpdateRequest.then(response => {
      console.log("Response:" + response.data);
      const responseCategory = response.data as CategoryModel;
      var categoryIndex = this.props.categories.findIndex(categroy => categroy.id === responseCategory.id);
      const newCatgegoryState = this.props.categories;
      newCatgegoryState[categoryIndex] = responseCategory;

      const fileSystemJustWithUrls: FileSystem =
        {
          categoriesState: newCatgegoryState,
          urlsState: []
        }
      this.props.dispatch(reloadCategories(fileSystemJustWithUrls));
    }).catch(error => {
      console.log('Error: ' + error);
    });
  }

  toggleExpandAndMarkCategory(id: number) {
    this.toogleExpand(id)
    this.markCategory(id)
  }


  render() {
    const categories = this.props.categories;
    const urls = this.props.urls;
    const parentId = this.props.parentId

    return (
      categories.length > 0 &&
      <div>
        <ul className={style.fileSystemEntryTree}>
          {StoreUtils.getAllChildCategories(categories, parentId).map(category => {
              return (
                <div>
                  <li className={style.category}>
                    <div id={"Category" + category.id} onClick={() => this.toggleExpandAndMarkCategory(category.id)}
                         draggable
                         onDragStart={(e) => this.onDragCategoryStart(e, category.id)}
                         onDragOver={(e) => this.onDragOver(e, category.id)}
                         onDragLeave={(e) => this.onDragLeave(e, category.id)}
                         onDrop={(e) => this.onDrop(e, category.id)}>
                      <Category name={category.name} id={category.id}/>
                    </div>
                    {category.isExpanded ?
                      <div>
                        <FileSystemTree categories={categories} urls={urls} parentId={category.id}
                                        dispatch={this.props.dispatch}/>
                        <ul>
                          {StoreUtils.getAllChildUrls(urls, category.id).map(url => {
                            return (
                              <div draggable onDragStart={(e) => this.onDragUrlStart(e, url.id)} onClick={() => this.markUrl(url.id)}>
                                <li className={style.url}>
                                  <Url name={url.name}/>
                                </li>
                              </div>)
                          })}
                        </ul>
                      </div> :
                      <div>
                      </div>
                    }
                  </li>
                </div>)
            }
          )}
        </ul>
      </div>
    );

  }
}
