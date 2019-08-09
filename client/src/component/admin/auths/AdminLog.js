import React, { Component } from 'react'
import {Row,Col, Card, Form, Icon, Input, Button, Checkbox} from 'antd'
import {enquireScreen} from 'enquire-js'
import Header from './Nav0'
import '../../../Home/less/antMotionStyle.less'
import axios from 'axios';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

 class AdminLog extends Component {
  constructor(props){
      super(props)
      this.state = {
          isMobile,
          show: !location.port,
      }
  }

    componentDidMount() {
        enquireScreen((b) => {
          this.setState({ isMobile: !!b });
        });
        if (location.port) {
          setTimeout(() => {
            this.setState({
              show: true,
            });
          }, 500);
        }
      }

      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            var headers = {
              'Content-Type': 'application/json'
            }
            var data = {
                email: values.email,
                password: values.password
            }
            axios.post('http://localhost:4000/admin/authenticate', data, headers)
            .then(res => {
                if (res.status === 200){
                  this.props.history.push('/admin_home')
                }else {
                  const error = new Error(res.error)
                  throw error
                }
                console.log(res)
                console.log(res.data) 
            })
            .catch(err => {
              console.error(err)
              alert('Error logging in  please try again')
            })
          }
        });
      };


    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <div style={{height:'100%', width:'100%', backgroundColor:'#EBF4FA', position:'fixed'}}>
           <Row gutter={8}>
             <Col span ={6} xs={1} lg={6}/>
             <Col span ={12} xs={22} lg={12}>
              <Card style={Style.card}>
              <h2>HHS Admin Login</h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
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
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <br/>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/admin_register">register now!</a>
        </Form.Item>
      </Form>
              </Card>
              
             </Col>
             <Col span ={6} xs={1} lg={6}/>         
           </Row>
            </div>
        )
    }
}
const LoginForm = Form.create({ name: 'normal_login' })(AdminLog);
export default LoginForm
const Style ={
  card:{
    height:'400px',
    marginTop:'25vh'
  }
}