import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/Stror";
import { onCloseCartDrawer } from "../app/features/GlobalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart } from "../app/features/CartSlice";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector((state) => state.cart);

  //   const btnRef = useRef();

  const { isOpenCartDrawer } = useAppSelector((state) => state.global);
  const onClose = () => {
    dispatch(onCloseCartDrawer());
  };
  const onClear = () => {
    dispatch(clearCart());
    onClose();
  };
  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((item) => (
                <CartDrawerItem key={item.id} item={item} />
              ))
            ) : (
              <Text fontSize={"lg"}>Your cart is empty</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            {cartProducts.length ? (
              <Button
                variant="outline"
                colorScheme="red"
                mr={3}
                onClick={onClear}
              >
                Clear All
              </Button>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
