import {FileSystemEntryModel} from "./FileSystemEntryModel";
import {UrlModel} from "./UrlModel";

export interface CategoryModel extends FileSystemEntryModel {
  categoryChildren: CategoryModel[];
  urlChildren: UrlModel[];
}
