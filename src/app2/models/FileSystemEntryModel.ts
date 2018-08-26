import TYPE = FileSystemEntryModel.TYPE;

export namespace FileSystemEntryModel {
  export enum TYPE {
    CATEGORY = "Category",
    URL = "Url"
  }
}

export interface FileSystemEntryModel {
  id: number;
  name: string;
  children: FileSystemEntryModel[];
  // isCategory: boolean;
  type: TYPE;
}

