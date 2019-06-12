export interface UrlModel  {
  discriminator: 'UrlModel';
  urlId: number;
  name: string;
  url: string;
  description: string;
  parentCategoryId: number;
  rating: number;
}
