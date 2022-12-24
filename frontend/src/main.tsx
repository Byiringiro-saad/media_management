import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

//files
import "./index.css";
import App from "./App";
import store from "./store/index";

//variables
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
