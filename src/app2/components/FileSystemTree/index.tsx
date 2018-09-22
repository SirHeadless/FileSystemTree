import * as React from "react";
import {Category} from "../Category";
import {Url} from "../Url";
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

export namespace FileSystemTree {
  export interface Props {
    categories: CategoryModel[];
    urls: UrlModel[];
    parentId: number | null;
    dispatch: Dispatch;
  }
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

  toogleExpand(id: number) {
    const categoies: CategoryModel[] = this.props.categories.map(category => {
      if (category.categoryId === id) {
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

  onDragOver(e : any){
    e.preventDefault();
  }

  onDragStart(e: any, urlId: number) {
    console.log("Dragstart", urlId);
    e.dataTransfer.setData("urlId", urlId);
  }

  onDrop(e: any, categoryId: number){
    console.log("DROP", categoryId);
    let urlId = Number(e.dataTransfer.getData("urlId"));

    const urlToUpdate: UrlModel | undefined = this.props.urls.find(url => {
      return url.urlId === urlId
    });

    if (urlToUpdate != undefined) {
      urlToUpdate.parentCategoryId = categoryId;
      const urlUpdateRequest = UrlRequests.updateUrl(urlToUpdate);

      urlUpdateRequest.then(response => {
        console.log("Response:" + response.data);
        const responseUrl = response.data as UrlModel;
        var urlIndex = this.props.urls.findIndex(url => url.urlId === responseUrl.urlId);
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

      // const fileSystemJustCategories: FileSystem = {
      //   categoriesState: [],
      //   urlsState: urls
      // }
      // this.props.dispatch(reloadUrls(fileSystemJustCategories))
    }
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
                    <div onClick={() => this.toogleExpand(category.categoryId)} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, category.categoryId)} >
                      <Category name={category.name} categoryId={category.categoryId}/>
                    </div>
                    {category.isExpanded ?
                      <div>
                        <FileSystemTree categories={categories} urls={urls} parentId={category.categoryId}
                                        dispatch={this.props.dispatch}/>
                        <ul>
                          {StoreUtils.getAllChildUrls(urls, category.categoryId).map(url => {
                            return (
                              <div draggable onDragStart={(e) => this.onDragStart(e, url.urlId)}>
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
