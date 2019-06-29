export interface UrlModel  {
  discriminator: 'UrlModel';
  id: number;
  name: string;
  url: string;
  description: string;
  parentId: number;
  rating: number;
}
