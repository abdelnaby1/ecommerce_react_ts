import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { Provider } from "react-redux";
import store from "./app/Stror";
import InternetConnectionProvider from "./providers/InternetConnectionProvider";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InternetConnectionProvider>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </InternetConnectionProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
