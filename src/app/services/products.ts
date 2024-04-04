import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPagination, IProduct, IProductCreate } from "../../interfaces";
import CookieService from "../../services/CookieService";

interface IProductsWithPagination {
  data: IProduct[];
  meta: IPagination;
}
interface Product {
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail?: File | null;
  category: { connect: number[] };
}
export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/`,
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<IProductsWithPagination, number>({
      query: (page) => {
        return {
          url: `products/?populate=category,thumbnail,categor&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              "Products",
            ]
          : ["Products"],
    }),
    deleteDashboardProduct: builder.mutation<IProduct, number>({
      query: (id) => {
        return {
          url: `products/${id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${CookieService.get("jwt")}` },
        };
      },
      invalidatesTags: ["Products"],
    }),
    editDashboardProduct: builder.mutation<IProduct, IProductCreate>({
      query: (arg: IProductCreate) => {
        const { id, title, description, thumbnail, price, stock } = arg;
        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({ title, description, price, stock })
        );
        if (thumbnail) {
          formData.append("files.thumbnail", thumbnail);
        }
        return {
          url: `products/${id}`,
          method: "PUT",
          body: formData,
          headers: { Authorization: `Bearer ${CookieService.get("jwt")}` },
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Products"],
    }),
    seedDashboardProduct: builder.mutation<IProduct[], Product>({
      query: (arg: Product) => {
        const { title, description, thumbnail, price, stock } = arg;
        console.log("arg", arg);

        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({ title, description, price, stock })
        );
        if (thumbnail) {
          formData.append("files.thumbnail", thumbnail);
        }
        return {
          url: `products`,
          method: "POST",
          body: { data: arg },
          headers: { Authorization: `Bearer ${CookieService.get("jwt")}` },
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useEditDashboardProductMutation,
  useSeedDashboardProductMutation,
} = productsApiSlice;
