import moment from "moment";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { connect } from "react-redux";
import { getUsersThunk, postUsersDeleteThunk, postUsersUpdateThunk } from "../actions/users";
import { Loading } from "../utils/Loading";
import { Button, Modal, Form, Input } from "antd";
import { ConfirmModal } from "../components/confirm-modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleUpdate: false,
      npp: 10,
      page: 1,
      data: {}
    };
  }

  onChange = e => {
    
    const dataTemp = { ...this.state.data };
    dataTemp[e.target.id] = e.target.value;

    console.log('dataTemp', dataTemp, e.target.id)
    this.setState({
      data: dataTemp
    });
  };

  componentDidMount() {
    this.handleFetchPosts();
  }

  handleFetchPosts(npp = this.state.npp, page = this.state.page) {
    this.props.dispatch(getUsersThunk(`?npp=${npp}&page=${page}`));
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

  handleOpenModal = (id, data = {}) => {
    console.log("data", data);
    this.setState(
      prevState => {
        return {
          [id]: !prevState[id],
          data: data
        };
      }, () => {
        this.handleFetchPosts()
      }
    );
  };

  handleDelete = (e, row) => {
    const { idModal } = e.currentTarget.dataset;
    console.log("e.currentTarget", e.currentTarget.dataset, row);
    this.handleOpenModal(idModal, row);
  };

  handleCancel = idModal => {
    this.handleOpenModal(idModal);
  };

  handleButtonDelete = (cell, row) => {
    return (
      <Button
        data-id-modal="visible"
        onClick={v => this.handleDelete(v, row)}
        type="danger"
      >
        Delete
      </Button>
    );
  };

  handleOk = () => {
    const { id } = this.state.data;
    this.props.dispatch(postUsersDeleteThunk({ id })).then(() => {
      // console.log('promise kena')
      this.handleOpenModal('visible');
    });
  };

  handleOkUpdate = () => {

    this.props.dispatch(postUsersUpdateThunk(this.state.data)).then(() => {
      this.handleOpenModal('visibleUpdate')
    })

  }


  handleUpdate = (e, row) => {
    const { idModal } = e.currentTarget.dataset;
    console.log("e.currentTarget", e.currentTarget.dataset, row);
    this.handleOpenModal(idModal, row);
  };




  handleButtonUpdate = (row) => {
    return(
      <Button
      data-id-modal="visibleUpdate"
      onClick={v =>  this.handleUpdate(v, row)}
      type="primary"
    >
      Update
    </Button>
    )
  }

  render() {
    console.log("this.props", this.state);

    const { data } = this.state;

    if (this.props.getUsers.data.users <= 0) {
      return <Loading isLoading />;
    }

    const options = {
      onPageChange: this.onPageChange,
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "25",
          value: 25
        }
      ],
      sizePerPage: 10
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
        {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={() => this.handleCancel("visible")}
        >
          <p>Apakah anda yakin akan menghapus {data.email || ""} tersebut ? </p>
        </Modal> */}

        {/**
         *
         * @Goal {*} props
         * put the props and state into ConfirmModal
         *
         */}

        <ConfirmModal
          title="Delete User"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel("visible")}
        >
          Yakin mau buang user {data.email || ""} tersebut ?
        </ConfirmModal>


        <ConfirmModal
          title="Update User"
          visible={this.state.visibleUpdate}
          onOk={this.handleOkUpdate}
          onCancel={() => this.handleCancel("visibleUpdate")}
        >
         
         <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item label="Name">
            <Input
              id="name"
              value={this.state.data.name}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              id="email"
              value={this.state.data.email}
              onChange={this.onChange}
            />
          </Form.Item>
        </Form>
        </ConfirmModal>


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
          <TableHeaderColumn dataSort dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="name">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.handleButtonDelete}>
            Action
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={(cell, row) => this.handleButtonUpdate(row)}>
            Update
          </TableHeaderColumn>
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
