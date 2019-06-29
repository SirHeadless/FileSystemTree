import { UrlModel, CategoryModel } from "app2/models";

export class FileSystemUtils {
    static instanceOfUrlModel(object: UrlModel | CategoryModel): object is UrlModel {
        // return object.discriminator === 'UrlModel';
        return 'url' in object;
    
      }
}
