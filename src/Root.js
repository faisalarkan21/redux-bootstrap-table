import "antd/dist/antd.css";
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ListUsers from "./pages/list-users";
import ListPosts from "./pages/list-posts";
import Sider from "./components/sidebar";
import configureStore from "./store/configureStore";
import DetailUsers from "./components/detail-users";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Sider>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/users" />}
                />
                <Route exact path="/users" component={ListUsers} />
                <Route path="/detail-users" component={DetailUsers} />
                <Route path="/posts" component={ListPosts} />
              </Switch>
            </Sider>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default Root;
