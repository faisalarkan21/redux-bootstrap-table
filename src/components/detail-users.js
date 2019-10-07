import { Button, Form, Input, Select } from "antd";
import { Formik } from "formik";
import qs from "query-string";
import React from "react";
import { connect } from "react-redux";
import { getSingelUserThunks, postUpdateUser } from "../actions/users";
const { Option } = Select;

class DetailUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  handleSubmit = props => {
    console.log("props submit", props);
    this.props.dispatch(postUpdateUser(props)).then(() => {
      alert("success!");
    });
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const { id } = qs.parse(search);
    this.props.dispatch(getSingelUserThunks(`?id=${id}`));
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  handleSelectChangeSelect = (value, props) => {
    props.setFieldValue("gender", value);
  };

  render() {
    console.log("this.props.getSingleUser.name", this.props.getSingleUser);
    return (
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={this.props.getSingleUser}
          onSubmit={(values, actions) => {
            this.handleSubmit(values);
            console.log("values", values);
          }}
          validate={values => {
            console.log("values222", values);
            const errors = {};
            if (!values.email) {
              errors.email = "Fill in email";
            }
            return errors;
          }}
          render={props => {
            console.log("props formik", props.errors);

            return (
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 8 }}
                onSubmit={props.handleSubmit}
              >
                <Form.Item label="Name">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    name="name"
                  />
                </Form.Item>
                <Form.Item label="Gender">
                  <Select
                    placeholder="Select a option and change input text above"
                    name="gender"
                    onBlur={props.handleBlur}
                    value={props.values.gender}
                    onChange={value =>
                      this.handleSelectChangeSelect(value, props)
                    }
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"
                  />
                  {props.errors.email && <div>{props.errors.email}</div>}
                </Form.Item>
                <Form.Item label="City">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phone}
                    name="phone"
                  />
                </Form.Item>
                <Form.Item label="City">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.city}
                    name="city"
                  />
                </Form.Item>
                <Form.Item label="Job Title">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.city}
                    name="job_title"
                  />
                </Form.Item>
                <Form.Item label="Adress">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.street_address}
                    name="street_address"
                  />
                </Form.Item>
                <Form.Item label="Postal Code">
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.postal_code}
                    name="postal_code"
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getSingleUser: state.getSingleUser.data
  };
}

export default connect(mapStateToProps)(DetailUsers);
