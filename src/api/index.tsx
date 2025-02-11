import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isShape, isString } from "../utils/validations";

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_CMS_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = import.meta.env.VITE_CMS_TOKEN;
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export interface WithSysId {
    sys: {
        id: string;
    };
}

export const hasId = isShape({ id: isString });
