import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { client } from "./api";
import { Main } from "./pages/Main";

function App() {
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Main />
            </ApolloProvider>
        </div>
    );
}

export default App;
