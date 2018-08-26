// import TYPE = FileSystemEntryModel.TYPE;

// export namespace FileSystemEntryModel {
//   export enum TYPE {
//     CATEGORY,
//     URL
//   }
// }

export interface FileSystemEntryModel {
  id: number;
  name: string;
  children: FileSystemEntryModel[];
  isCategory: boolean;
  // type: TYPE;
}

// Delete Me
export namespace FileSystemEntryModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
