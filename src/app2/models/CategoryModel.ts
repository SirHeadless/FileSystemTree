export interface CategoryModel{
  categoryId: number;
  name: string;
  // fileSystemEntryType: TYPE;
  isExpanded: boolean;
  parentId: number | null;
}
