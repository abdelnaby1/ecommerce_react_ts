import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Image,
  Flex,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import {
  useDeleteDashboardProductMutation,
  useEditDashboardProductMutation,
  useGetDashboardProductsQuery,
  useSeedDashboardProductMutation,
} from "../../app/services/products";
import { IProduct, IProductCreate } from "../../interfaces";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import AlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import CustomeModal from "../shared/Modal";
import ProductForm from "./ProductForm";
import React from "react";
import { useAppSelector } from "../../app/Stror";

export const ProductsTable = () => {
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
    null
  );
  const [productToEdit, setProductToEdit] = useState<IProductCreate | null>(
    null
  );
  const toast = useToast();
  const { isLoading, data } = useGetDashboardProductsQuery(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //for dialog foucs input
  const initialRef = React.useRef(null);
  const { isOnline } = useAppSelector((state) => state.network);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductMutation();

  const [editProduct, { isLoading: isEditing, isSuccess: isEditingSuccess }] =
    useEditDashboardProductMutation();

  const [seedProduct, { isLoading: isSeeding, isSuccess: isSeedingSuccess }] =
    useSeedDashboardProductMutation();
  const onDeleteClick = (id: number) => {
    setProductToDeleteId(id);
    onOpen();
  };
  const onDestroy = async () => {
    if (productToDeleteId) {
      await destroyProduct(productToDeleteId);
    }
  };
  const onEditClick = (product: IProduct) => {
    const productToEdit: IProductCreate = {
      id: product.id,
      title: product.attributes.title,
      description: product.attributes.description,
      price: product.attributes.price,
      stock: product.attributes.stock,
      thumbnailUrl:
        product.attributes.thumbnail.data.attributes.formats.medium.url,
    };
    setProductToEdit(productToEdit);
    onOpenModal();
  };
  const onUpdate = async () => {
    if (productToEdit) {
      await editProduct(productToEdit);
    }
  };
  useEffect(() => {
    if (isSeedingSuccess) {
      toast({
        title: "Products Addedd successfully.",
        // description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSeedingSuccess]);
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setProductToDeleteId(null);
      toast({
        title: "Product Deleted successfully.",
        // description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isEditingSuccess) {
      onCloseModal();
      setProductToEdit(null);
      toast({
        title: "Product Updated successfully.",
        // description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isEditingSuccess]);

  const onGenerate = () => {
    for (let index = 0; index < 2; index++) {
      seedProduct({
        title: faker.word.words(4),
        description: faker.lorem.paragraph(2),
        price: faker.number.float({ min: 10, max: 400, fractionDigits: 2 }),
        stock: faker.number.int({ min: 1, max: 50 }),
        category: { connect: [1] },
      });
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleInputPriceChange = (valueAsS: string) => {
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        price: +valueAsS,
      });
    }
  };
  const handleInputStockChange = (valueAsS: string) => {
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        stock: +valueAsS,
      });
    }
  };
  const handleInputThubmnailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        [e.target.name]: e.target?.files?.[0],
      });
    }
    console.log(e.target.files);
  };
  if (isLoading || !isOnline) {
    return <ProductsTableSkeleton />;
  }
  return (
    <>
      <Button onClick={onGenerate} isLoading={isSeeding}>
        Generate
      </Button>
      <TableContainer maxW={"95%"} mx={"auto"} my={10}>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Actios</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((prodcut: IProduct) => (
              <Tr key={prodcut.id}>
                <Td>{prodcut.id}</Td>
                <Td>{prodcut.attributes.title}</Td>
                <Td>{prodcut.attributes.category.data.attributes.title}</Td>
                <Td>
                  <Image
                    src={
                      prodcut?.attributes?.thumbnail?.data?.attributes?.formats
                        .small.url
                    }
                    alt={prodcut.attributes?.title}
                    boxSize={"40px"}
                    objectFit={"cover"}
                    borderRadius={"full"}
                  />
                </Td>
                <Td isNumeric>{prodcut.attributes.price} EGP</Td>
                <Td isNumeric>{prodcut.attributes.stock}</Td>
                <Td>
                  <Flex alignItems={"center"} gap={2}>
                    <Button
                      as={Link}
                      to={`/dashboard/products/${prodcut.id}`}
                      variant={"solid"}
                      colorScheme="purple"
                      onClick={() => {}}
                    >
                      <AiOutlineEye />
                    </Button>
                    <Button
                      variant={"solid"}
                      colorScheme="red"
                      onClick={() => onDeleteClick(prodcut.id)}
                    >
                      <BsTrash />
                    </Button>
                    <Button
                      variant={"solid"}
                      colorScheme="blue"
                      onClick={() => onEditClick(prodcut)}
                    >
                      <FiEdit2 />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Actios</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <AlertDialog
        title="Delete Product"
        description="Are you want to delete this product? You can't undo this action afterwards."
        cancelText="Cancel"
        okText="Destroy"
        isLoading={isDestroying}
        isOpen={isOpen}
        onClose={onClose}
        onOkHander={onDestroy}
      />
      <CustomeModal
        title="Edit Product"
        actionsText="Edit"
        isLoading={isEditing}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        initialRef={initialRef}
        okHandler={onUpdate}
      >
        <ProductForm
          initialRef={initialRef}
          mode="edit"
          productToEditData={productToEdit}
          handleInputChange={handleInputChange}
          handleInputPriceChange={handleInputPriceChange}
          handleInputStockChange={handleInputStockChange}
          handleInputThubmnailChange={handleInputThubmnailChange}
        />
      </CustomeModal>
    </>
  );
};
