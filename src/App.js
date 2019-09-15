import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { getUsersThunk } from "./actions/users";

class App extends React.Component {

  componentDidMount(){
    this.handleFetchUsers();    
  }

  handleFetchUsers(){
    this.props.dispatch(getUsersThunk())
  }
  
  render() {
    return (
      <div className="App">
        {
          this.props.getUsers.data.map((v) => {
            return (
              <ul>
                <li>{v.name}</li>
              </ul>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getUsers: state.getUsers,
  };
}

export default connect(mapStateToProps)(App);
