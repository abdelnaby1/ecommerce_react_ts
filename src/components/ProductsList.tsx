import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { IProduct } from "../interfaces";
import { useQuery } from "react-query";
import ProductSkeleton from "./ProductSkeleton";
const ProductsList = () => {
  const getProducts = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery("products", () => getProducts());

  if (isLoading) {
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );
  }
  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
    >
      {data?.data?.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsList;
