import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { Home } from "./pages/home";

function App() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}

export default App;
