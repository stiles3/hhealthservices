import React, { Component } from 'react'
import {Row,Col, Card, Form, Icon, Input, Button, Checkbox, Tooltip} from 'antd'
import {enquireScreen} from 'enquire-js'
import axios from 'axios'
import '../../../Home/less/antMotionStyle.less'
import {BrowserRouter as Redirect} from 'react-router-dom'

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

 class AdminReg extends Component {
  constructor(props){
      super(props)
      this.state = {
          isMobile,
          show: !location.port,
          confirmDirty:false,
          token:""
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
          var headers = {
            'Content-Type': 'application/json'
          }
          var data = {
              name:  values.nickname,
              email: values.email,
              password: values.password
          }
          if (!err) {
            console.log('Received values of form: ', data);
          axios.post('http://localhost:4000/admin/register', data, headers)
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
      
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };

      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };

    render() {
      const { getFieldDecorator } = this.props.form;
     
        return (
            <div style={{height:'100%', width:'100%', backgroundColor:'#EBF4FA', position:'fixed'}}>
           <Row gutter={8}>
             <Col span ={6} xs={1} lg={6}/>
             <Col span ={12} xs={22} lg={12}>
              <Card style={Style.card}>
              <h2>HHS Admin Register</h2>
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
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Register
          </Button>
      </Form>
              </Card>
              
             </Col>
             <Col span ={6} xs={1} lg={6}/>         
           </Row>
            </div>
        )
    }
}
const RegForm = Form.create({ name: 'normal_login' })(AdminReg);
export default RegForm
const Style ={
  card:{
  //  height:'400px',
    marginTop:'15vh'
  }
}