import Axios from "axios";
import {CategoryModel} from "../../models";

export class CategoryRequests {

  static allCategories() {
    return Axios.get("http://localhost:8080/category", {auth: {username: "admin", password: "admin"}})
  }

  static updateCategory(category: CategoryModel) : Promise<any>{
    return Axios.put("http://localhost:8080/category", category, {auth: {username: "admin", password: "admin"}})
  }

  static removeCategory(id: number) : Promise<any>{
    return Axios.delete("http://localhost:8080/category/" + id, { auth: {username: "admin", password: "admin"}})
  }

  static addCategory(category: CategoryModel) : Promise<any> {
    return Axios.post("http://localhost:8080/category", category, {auth: {username: "admin", password: "admin"}})
  }
}
