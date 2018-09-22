import {UrlModel} from "./index";
import {CategoryModel} from "./CategoryModel";

export interface FileSystem {
  categoriesState : CategoryModel[],
  urlsState : UrlModel[]
}
