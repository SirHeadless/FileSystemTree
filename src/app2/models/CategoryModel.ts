export interface CategoryModel{
  discriminator: 'CategoryModel';
  categoryId: number;
  name: string;
  description: string;
  // fileSystemEntryType: TYPE;
  isExpanded: boolean;
  parentId: number | null;
}
