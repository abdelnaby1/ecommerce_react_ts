interface IProductAttributes {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: IProductCategory;
  thumbnail: {
    data: {
      attributes: {
        formats: {
          thumbnail: { url: string };
          medium: { url: string };
          small: { url: string };
        };
      };
    };
  };
}
interface IProductCategory {
  data: { attributes: { title: string } };
}
export interface IProduct {
  id: number;
  attributes: IProductAttributes;
  // category: IProductCategory;
}
export interface ICartItem {
  id: number;
  qty: number;
  attributes: IProductAttributes;
  // category: IProductCategory;
}
export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface IProductCreate {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnailUrl?: string;
  thumbnail?: File | null;
  category?: { connect: number[] };
}
