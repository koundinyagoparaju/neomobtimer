import '../styles/globals.css'
import {Provider} from "react-redux";
import store from "../components/store";
import {ChakraProvider} from "@chakra-ui/react";

function MyApp({Component, pageProps}) {
    return <Provider store={store}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </Provider>;
}

export default MyApp
