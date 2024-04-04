import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { FiFile } from "react-icons/fi";
import { IProductCreate } from "../../interfaces";
interface IProps {
  mode?: "edit" | "create";
  productToEditData?: IProductCreate | null;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleInputPriceChange: (valueAsS: string) => void;
  handleInputStockChange: (valueAsS: string) => void;
  handleInputThubmnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialRef: React.RefObject<HTMLInputElement>;
}
const ProductForm = ({
  mode = "create",
  productToEditData = null,
  handleInputChange,
  handleInputPriceChange,
  handleInputStockChange,
  handleInputThubmnailChange,
  initialRef,
}: IProps) => {
  return (
    <Flex gap={2} flexDirection={"column"}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          onChange={handleInputChange}
          ref={initialRef}
          placeholder="Title"
          defaultValue={productToEditData?.title}
          name="title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          onChange={handleInputChange}
          placeholder="Description"
          size="sm"
          defaultValue={productToEditData?.description}
          name="description"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Price</FormLabel>
        <NumberInput
          min={1}
          defaultValue={productToEditData?.price}
          onChange={handleInputPriceChange}
          name="price"
        >
          <NumberInputField placeholder="Price" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Stock</FormLabel>
        <NumberInput
          min={0}
          defaultValue={productToEditData?.stock}
          name="stock"
          onChange={handleInputStockChange}
        >
          <NumberInputField placeholder="Stock" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel display={"flex"} alignItems={"center"}>
          Thumbnail :
          {mode === "edit" ? (
            <Image
              src={productToEditData?.thumbnailUrl}
              alt={productToEditData?.title}
              boxSize={"40px"}
              objectFit={"cover"}
              borderRadius={"full"}
            />
          ) : null}
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiFile} />
          </InputLeftElement>
          <Input
            type="file"
            name="thumbnail"
            onChange={handleInputThubmnailChange}
          />
        </InputGroup>
      </FormControl>
    </Flex>
  );
};

export default ProductForm;
