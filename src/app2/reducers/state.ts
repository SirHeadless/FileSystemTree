import {RouterState} from "react-router-redux";
import {FileSystem} from "../models/FileSystem";
import {UrlModel} from "../models";
import {UrlFormFields} from "../models/UrlFormFields";



export interface RootState {
  fileSystemState: RootState.FileSystemState;
  router: RouterState;
  markedUrlState: UrlModel;
  urlFormFields: UrlFormFields;
}

export namespace RootState{
  export type FileSystemState = FileSystem;

}
