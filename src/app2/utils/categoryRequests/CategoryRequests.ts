import Axios from "axios";

export class CategoryRequests {

  static allCategories() {
    return Axios.get("http://localhost:8080/category")
  }
}
