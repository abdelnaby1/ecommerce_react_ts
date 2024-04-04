import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  useColorMode,
  Image,
  Text,
  Flex,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import imgFalBack from "../assets/img-placeholder.png";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/ProductSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { ICartItem, IProduct } from "../interfaces";
import { useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../app/Stror";
import { addToCart } from "../app/features/CartSlice";
import { onCloseCartDrawer } from "../app/features/GlobalSlice";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector((state) => state.cart);

  const getProduct = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery(["products", id], () =>
    getProduct()
  );
  const product: IProduct = data?.data;
  const goBack = () => navigate(-1);

  const addToCartHandler = () => {
    const item: ICartItem = {
      id: product.id,
      attributes: product.attributes,
      qty: 1,
    };

    dispatch(addToCart(item));
    dispatch(onCloseCartDrawer());
  };
  const isProductAddedAndQty = () => {
    const index = cartProducts.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      return <Text>({cartProducts[index].qty})</Text>;
    } else {
      return null;
    }
  };
  useEffect(() => {
    document.title = product
      ? `${product?.attributes?.title} Page`
      : "Prroduct Page";
  }, [product]);

  if (isLoading) {
    return (
      <Box maxW={"sm"} mx={"auto"} my={"20"}>
        <ProductSkeleton />
      </Box>
    );
  }
  if (error) return <h3>Error...</h3>;

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW={"sm"}
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <ArrowBackIcon />
        <Text ml={"2"}>Back</Text>
      </Flex>
      <Card
        maxW="sm"
        mx={"auto"}
        mb={20}
        border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
        boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
        bg={"none"}
      >
        <CardBody>
          <Image
            src={
              product?.attributes?.thumbnail?.data?.attributes?.formats?.medium
                ?.url
            }
            alt={product?.attributes?.title}
            borderRadius="lg"
            h={"200px"}
            w={"full"}
            fallbackSrc={imgFalBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>
              {product?.attributes.title}
            </Heading>
            <Text fontSize={"small"} textAlign={"center"}>
              {product?.attributes.description}
            </Text>
            <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
              ${product?.attributes.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="purple"
            w={"full"}
            size={"lg"}
            bg={"#6b28ef"}
            _hover={{
              bg: "#570af2",
              border: "transparent",
            }}
            color={"white"}
            p={8}
            textTransform={"uppercase"}
            onClick={addToCartHandler}
          >
            Add to cart {isProductAddedAndQty()}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;
