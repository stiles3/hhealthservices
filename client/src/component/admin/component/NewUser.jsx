import React from 'react'
import { Button,Select, Modal, Form, Input, Tooltip,Icon,DatePicker, Checkbox } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

          render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const {Option} = Select
      const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      return (
        <Modal
          visible={visible}
          title="Create a new user"
          okText="Create"
          onCancel={onCancel}
          onOk={this.handleSubmit}
        >
         <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="Write the full name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Habitual Residence">
          {getFieldDecorator('residence', {
            rules: [
              {  required: true, message: 'Please select your habitual residence!' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="DatePicker">
          {getFieldDecorator('date-picker', config)(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Monthly Income">
          {getFieldDecorator('monthly income', {
            rules: [
              {  required: true, message: 'Please select your monthly income' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Occupation">
          {getFieldDecorator('occupation', {
            rules: [
              {  required: true, message: 'Please select your occupation' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [
              {  required: true, message: 'Please select your phone number' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Gender" >
      <Select defaultValue="Male">
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Cash/Check" >
      <Select defaultValue="Cash">
        <Option value="Cash">Cash</Option>
        <Option value="Check">Check</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Marital Status" >
      <Select defaultValue="Single">
        <Option value="Single">Single</Option>
        <Option value="Married">Married</Option>
      </Select>
    </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
        </Modal>
      );
    }
  },
);

export default class NewUser extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
     
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New User
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
