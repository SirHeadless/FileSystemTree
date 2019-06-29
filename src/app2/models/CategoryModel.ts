export interface CategoryModel{
  discriminator: 'CategoryModel';
  id: number;
  name: string;
  description: string;
  // fileSystemEntryType: TYPE;
  isExpanded: boolean;
  parentId: number | null;
}
