import {RouterState} from "react-router-redux";
import {FileSystem} from "../models/FileSystem";



export interface RootState {
  fileSystemState: RootState.FileSystemState;
  router: RouterState;

}

export namespace RootState{
  export type FileSystemState = FileSystem;

}
