import { useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useAppDispatch } from "../app/Stror";
import { networkMode } from "../app/features/NetworkSlice";
interface Iprops {
  children: ReactNode;
}
const InternetConnectionProvider = ({ children }: Iprops) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const dispatch = useAppDispatch();

  function close() {
    if (toastIdRef) {
      toast.closeAll(toastIdRef.current);
    }
  }
  function addToast() {
    toast({
      title: "You're offline.",
      description: "Please make sure you have internet connection.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }
  const setOnlineListener = () => {
    dispatch(networkMode(true));
    close();
  };
  const setOfflineListener = () => {
    dispatch(networkMode(false));
    addToast();
  };
  useEffect(() => {
    window.addEventListener("offline", setOfflineListener);

    window.addEventListener("online", setOnlineListener);
    return () => {
      window.removeEventListener("online", setOnlineListener);
      window.removeEventListener("offline", setOfflineListener);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;
