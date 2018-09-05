import {RouterState} from "react-router-redux";
import {CategoryModel} from "../models/CategoryModel";

export interface RootState {
  fileSystemEntry: RootState.FileSystemEnrtyState;
  router: RouterState;
}

export namespace RootState{
  export type FileSystemEnrtyState = CategoryModel[];
}
