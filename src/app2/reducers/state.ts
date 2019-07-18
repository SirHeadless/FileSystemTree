import {RouterState} from "react-router-redux";
import {FileSystem} from "../models/FileSystem";
import {CategoryModel, UrlModel} from "../models";
import {UrlFormFields} from "../models/UrlFormFields";
import {CategoryFormFields} from "../models/CategoryFormFields";



export interface RootState {
  fileSystemState: RootState.FileSystemState;
  router: RouterState;
  markedElementState: UrlModel | CategoryModel | null;
  urlFormFields: UrlFormFields;
  categoryFormFields: CategoryFormFields;
  form: CategoryModel | UrlModel;
  addFileSystemToggle: Boolean;
}

export namespace RootState{
  export type FileSystemState = FileSystem;

}
