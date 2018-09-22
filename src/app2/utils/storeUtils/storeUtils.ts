import {CategoryModel, UrlModel} from "../../models";

export class StoreUtils{

  static getAllChildUrls(urls : UrlModel[], parentId : number) : UrlModel[]{
    return urls.filter(url => url.parentCategoryId === parentId);
  }

  static getAllChildCategories(categories : CategoryModel[], parentId : number | null) : CategoryModel[]{
    return categories.filter(catetegory => catetegory.parentId === parentId);
  }

}
