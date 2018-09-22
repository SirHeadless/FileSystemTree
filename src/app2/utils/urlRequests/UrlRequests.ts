import Axios from "axios";

export class UrlRequests{

  static allUrls() {
    return Axios.get("http://localhost:8080/url")
  }
}
