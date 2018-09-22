import * as React from "react";
import {Category} from "../Category";
import {Url} from "../Url";
import * as style from './style.less';
import {CategoryModel} from "../../models/CategoryModel";
import {UrlModel} from "../../models";
import {StoreUtils} from "../../utils/storeUtils/storeUtils";

export namespace FileSystemTree {
  export interface Props {
    categories: CategoryModel[];
    urls: UrlModel[];
    parentId:number | null;
  }
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

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
                    <div>
                      <Category name={category.name}/>
                    </div>
                    {true ?
                      <div>
                        <FileSystemTree categories={categories} urls={urls} parentId={category.categoryId}/>
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
