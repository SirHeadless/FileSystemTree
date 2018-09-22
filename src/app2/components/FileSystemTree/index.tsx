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

export namespace FileSystemTree {
  export interface Props {
    categories: CategoryModel[];
    urls: UrlModel[];
    parentId:number | null;
    dispatch: Dispatch;
  }
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

  toogleExpand(id : number) {
    const categoies : CategoryModel[] =this.props.categories.map(category => {
      if (category.categoryId === id) {
        return {...category, isExpanded: !category.isExpanded }
      }
      return category;
    })
    const fileSystemJustCategories : FileSystem = {
      categoriesState: categoies,
      urlsState: []
    }
    this.props.dispatch(reloadCategories(fileSystemJustCategories));
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
                    <div onClick={() => this.toogleExpand(category.categoryId)}>
                      <Category name={category.name} categoryId={category.categoryId} />
                    </div>
                    {category.isExpanded ?
                      <div>
                        <FileSystemTree categories={categories} urls={urls} parentId={category.categoryId} dispatch={this.props.dispatch}/>
                        <ul>
                          {StoreUtils.getAllChildUrls(urls, category.categoryId).map(url => {
                            return (
                              <li className={style.url}>
                                <Url name={url.name}/>
                              </li>)
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
