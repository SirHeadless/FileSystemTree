import Axios from "axios";
import {UrlModel} from "../../models";

export class UrlRequests{

  static allUrls() {
    return Axios.get("http://localhost:8080/url", { auth: {username: "admin", password: "admin"}})
  }

  static updateUrl(url: UrlModel) : Promise<any>{
    return Axios.put("http://localhost:8080/url", url, { auth: {username: "admin", password: "admin"}})
  }
}
