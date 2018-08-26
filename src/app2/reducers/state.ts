import {RouterState} from "react-router-redux";
import {FileSystemEntryModel} from "app2/models";

export interface RootState {
  fileSystemEntry: RootState.FileSystemEnrtyState;
  router: RouterState;
}

export namespace RootState{
  export type FileSystemEnrtyState = FileSystemEntryModel[];
}
