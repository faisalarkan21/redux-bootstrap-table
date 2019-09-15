import React from "react";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getPostsThunk } from "../actions/posts";
import { Loading } from "../utils/Loading";
import moment from "moment";

class App extends React.Component {
  componentDidMount() {
    this.handleFetchPosts();
  }

  handleFetchPosts() {
    this.props.dispatch(getPostsThunk());
  }

  handleImages(cell, row) {
    console.log("props-table", cell);
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
    if (this.props.getPosts.data <= 0) {
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
          data={this.props.getPosts.data}
          striped
          hover
        >
          <TableHeaderColumn width={100} isKey dataSort dataField="id">
            ID Post
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="title">Title</TableHeaderColumn>
          <TableHeaderColumn
            dataFormat={this.handleFormatDate}
            dataField="createdAt"
          >
            Created Date
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="author">Author</TableHeaderColumn>
          <TableHeaderColumn
            width={80}
            dataFormat={this.handleImages}
            dataField="avatar"
          >
            Avatar
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getPosts: state.getPosts
  };
}

export default connect(mapStateToProps)(App);
