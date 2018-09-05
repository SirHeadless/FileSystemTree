import * as React from "react";
import {Category} from "../Category";
import {Url} from "../Url";
import * as style from './style.less';
import {CategoryModel} from "../../models/CategoryModel";

export namespace FileSystemTree {
  export interface Props {
    categories: CategoryModel[];
  }
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

  render() {
    const categories = this.props.categories;

    return(
      categories.length > 0 &&
      <div>
        <ul className={style.fileSystemEntryTree}>
          {categories.map(category => {
            return (
              <div>
              <li className={style.category}>
                <div>
                  <Category name={category.name}/>
                </div>
                <FileSystemTree categories={category.categoryChildren} />
              </li>
                <ul>
                {category.urlChildren.map(url => {
                  return (
                    <li className={style.url}>
                      <Url name={url.name}/>
                    </li>)})}
                </ul>
              </div>)
          }
          )}
        </ul>
      </div>
    );

  }
}
