import React from "react";
import { Provider } from "react-redux";
import App from "./pages/list-users";
import 'antd/dist/antd.css';
import configureStore from "./store/configureStore";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    );
  }
}

export default Root;
