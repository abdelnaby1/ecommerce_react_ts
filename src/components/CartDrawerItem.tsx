import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { ICartItem } from "../interfaces";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../app/Stror";
import {
  decrementProductQty,
  incrementProductQt,
  removeFromCart,
} from "../app/features/CartSlice";
interface IProps {
  item: ICartItem;
}

const CartDrawerItem = ({ item }: IProps) => {
  const {
    attributes: { title, thumbnail, price, category },
    qty,
  } = item;
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex
        alignItems={"center"}
        mb={"3"}
        py={"2"}
        p={"1"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Image
            src={thumbnail?.data?.attributes?.formats?.small?.url}
            alt={title}
            maxW={"80px"}
            h={"fit-content"}
            objectFit={"contain"}
            borderRadius={"10"}
          />
        </Stack>

        <Stack>
          <Text fontSize={"sm"} color="gray" fontWeight={"400"}>
            {category.data.attributes.title.toUpperCase()}
          </Text>
          <Text fontSize={"sm"} fontWeight={"500"}>
            {title}
          </Text>

          <Text fontSize={"sm"} fontWeight={"500"}>
            {price} EGP
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Button
              variant={"solid"}
              size={"sx"}
              w={6}
              h={6}
              rounded={"full"}
              cursor={"pointer"}
              onClick={() => dispatch(decrementProductQty(item))}
            >
              <MinusIcon />
            </Button>
            <Text fontSize={"sm"}>{qty}</Text>
            <Button
              variant={"solid"}
              size={"sx"}
              w={6}
              h={6}
              rounded={"full"}
              cursor={"pointer"}
              onClick={() => dispatch(incrementProductQt(item))}
              isDisabled={item.qty === item.attributes.stock}
            >
              <AddIcon />
            </Button>
          </Flex>
        </Stack>
        <Button
          variant={"outline"}
          size={"xs"}
          w={"fit-content"}
          p={2}
          alignSelf={"flex-start"}
          colorScheme="red"
          onClick={() => dispatch(removeFromCart(item))}
        >
          <DeleteIcon />
        </Button>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
