import moment from "moment";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { connect } from "react-redux";
import { getUsersThunk } from "../actions/users";
import { Loading } from "../utils/Loading";

class App extends React.Component {
  componentDidMount() {
    this.handleFetchPosts();
  }

  handleFetchPosts() {
    this.props.dispatch(getUsersThunk());
  }

  handleImages(cell, row) {
    // console.log("props-table", cell);
    return <img src={cell} width={50} height={50} />;
  }

  handleFormatDate(cell, row) {
    /**
     * @Formating
     * moment formating
     */

    return moment(cell).format("LLL");
  }

  render() {

    console.log('this.props', this.props.getUsers.data.users)

    if (this.props.getUsers.data.users <= 0) {
      return <Loading isLoading />;
    }

    const options = {
      onPageChange: this.onPageChange,
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        }
      ],
      sizePerPage: 5
    };

    return (
      <div
        style={{
          width: "85%",
          marginTop: 50,
          marginLeft: 100,
          marginRight: 100
        }}
        className="list-table"
      >
        <BootstrapTable
          pagination
          search
          exportCSV
          options={options}
          data={this.props.getUsers.data.users}
          striped
          hover
        >
          <TableHeaderColumn width={100} isKey dataSort dataField="id">
            ID Post
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="email">Email</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="name">Name</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getUsers: state.getUsers
  };
}

export default connect(mapStateToProps)(App);
