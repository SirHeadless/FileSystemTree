import TYPE = FileSystemEntryModel.TYPE;

export namespace FileSystemEntryModel {
  export enum TYPE {
    CATEGORY = "CATEGORY",
    URL = "URL"
  }
}

export interface FileSystemEntryModel {
  id: number;
  name: string;
  fileSystemEntryType: TYPE;
}

