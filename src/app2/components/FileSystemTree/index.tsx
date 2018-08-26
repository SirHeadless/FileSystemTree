import {FileSystemEntryModel} from "../../models/FileSystemEntryModel";
import * as React from "react";
import {Category} from "../Category";
import {Url} from "../Url";

export namespace FileSystemTree {
  export interface Props {
    fileSystemEntries: FileSystemEntryModel[];
  }
}

export class FileSystemTree extends React.Component<FileSystemTree.Props> {

  render() {
    const fileSystemEntries = this.props.fileSystemEntries;

    return(
      fileSystemEntries.length > 0 &&
        <ul className="fileSystemEntryTree">
          {fileSystemEntries.map(fileSystemEntry => {
            return fileSystemEntry.isCategory?
              <li className="category">
                <div>
                  <Category name={fileSystemEntry.name}/>
                </div>
                <FileSystemTree fileSystemEntries={fileSystemEntry.children}/>
              </li> :
              <li className="url">
                <Url name={fileSystemEntry.name}/>
              </li>
          }
          )}
        </ul>
    );
  }
}
