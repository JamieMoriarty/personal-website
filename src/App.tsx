import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { Main } from "./pages/Main";

function App() {
    return (
        <ApolloProvider client={client}>
            <Main />
        </ApolloProvider>
    );
}

export default App;
