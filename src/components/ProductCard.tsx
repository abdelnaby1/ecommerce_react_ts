import {
  Card,
  Image,
  Text,
  CardBody,
  Stack,
  Heading,
  Button,
  useColorMode,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { colorMode } = useColorMode();
  const { attributes } = product;
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.medium?.url}
          alt={product?.attributes?.title}
          borderRadius={"full"}
          boxSize={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"}>
            {attributes.title}
          </Heading>
          <Text fontSize={"small"} textAlign={"center"}>
            {attributes.description}
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            ${attributes.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          variant="outline"
          colorScheme="blue"
          as={Link}
          to={`/products/${product.id}`}
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          size={"xl"}
          border={"none"}
          py={"5"}
          overflow={"hidden"}
          w={"full"}
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
            color: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
            border: "transparant",
          }}
          mt={"6"}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
