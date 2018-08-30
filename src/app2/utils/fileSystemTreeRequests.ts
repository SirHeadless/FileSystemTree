import Axios from "axios";

export class FileSystemTreeRequests {

  static fullFileSystemTree() {
    return Axios.get("http://localhost:8080/fileSystemTree/4")
  }
}
