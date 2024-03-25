// add the beginning of your app entry
import React from "react";
import "vite/modulepreload-polyfill";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppBackEnd from "./AppBackEnd.jsx";
import "./index.scss";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sofa.gruposantamaria.cr/graphql",
  cache: new InMemoryCache(),
});

if (document.getElementById("TheSofaFactory")) {
  ReactDOM.createRoot(document.getElementById("TheSofaFactory")).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
} else if (document.getElementById("TheSofaFactory-options")) {
  ReactDOM.createRoot(document.getElementById("TheSofaFactory-options")).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppBackEnd />
      </ApolloProvider>
    </React.StrictMode>
  );
}
