import Axios from "axios";
import {UrlModel} from "../../models";

export class UrlRequests{

  static allUrls() {
    return Axios.get("http://localhost:8080/url")
  }

  static updateUrl(url: UrlModel) : Promise<any>{
    return Axios.put("http://localhost:8080/url", url)
  }
}
