import Axios from "axios";
import {CategoryModel} from "../../models";

export class CategoryRequests {

  static allCategories() {
    return Axios.get("http://localhost:8080/category")
  }

  static updateCategory(category: CategoryModel) : Promise<any>{
    return Axios.put("http://localhost:8080/category", category)
  }
}
