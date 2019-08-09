import React ,{Component} from 'react'
import {
    Form,
    Input,
    Select,
    Row,
    Card,
    Col,
    DatePicker,
    Button,
  } from 'antd';
  import '../App.css'
  import Nav0 from '../Home/Nav0';
  import Footer1 from '../Home/Footer1';
  import {Nav00DataSource, Footer10DataSource,} from '../Home/data.source'
  import axios from 'axios'
  
  class RegistrationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_details:{
                name:"",
                residential_address:"",
                date_of_birth:"",
                occupation:"",
                phone_number:"",
                email:"",
                marital_status:"",
                cash_check:"",
                income_monthly:"",
                gender:"",
                autoCompleteResult: [],
            }
        }
    }
    onChange = (name) => event => {
        const {user_details} = this.state
        this.setState({
            user_details:{
                ...user_details,
                [name]: event.target.value
            }
        })
        console.log(name, event.target.value)
    }

    onChangeSelect = name => (value) => {
        console.log(`selected ${value}`);
        const {user_details} = this.state;
        this.setState({
            user_details:{
                 ...user_details,
                 [name]:value
                  }
      });
    }
     onChangeDate = (date, dateString) => {

        const {user_details} = this.state;
        this.setState({
            user_details:{
                 ...user_details,
                 date_of_birth:dateString
                  }
      });
      }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        var headers = {
          'Content-Type': 'application/json'
        }
        const code = values.codeprefix
        const phone = values.phone

        const prefix = values.currencyprefix
        const income = values.Income

       const {user_details} = this.state
        var data = {
          name:  user_details.name,
          residential_address: user_details.residential_address,
          date_of_birth: user_details.date_of_birth,
          occupation: user_details.occupation,
          marital_status: user_details.marital_status,
          gender: user_details.gender,
          phone_number: code + phone,
          email: user_details.email,
          cash_check: user_details.cash_check,
          income_monthly: prefix + income
      }
        if (!err) {
          console.log('Received values of form: ', values);
          console.log('Received values of form: ', data);
          axios.post('http://localhost:4000/users/create',data, headers)
          .then(res => {
            if(res.status === 200){
              this.props.history.push('/#Content0_0')
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
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const {Option}= Select
      const {user_details} = this.state
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const codeSelector = getFieldDecorator('codeprefix', {
        initialValue: '+86',
      })(
        <Select style={{ width: 70 }}>
            <Option value="+86">+86</Option>
          <Option value="+87">+87</Option>
        </Select>,
      );
     
      const currencySelector = getFieldDecorator('currencyprefix', {
        initialValue: '$',
      })(
        <Select style={{ width: 70 }}>
          <Option value="$">$</Option>
          <Option value="#">#</Option>
        </Select>,
      );
      return (
        <div>
        <Nav0
        id="Nav0_0"
        key="Nav0_0"
        dataSource={Nav00DataSource}
        isMobile={this.state.isMobile}
      />
        <Row className="wrapper">
        <Col span={8} xs={1} md={4} lg={6} xl={6}/>
        <Col span={8} xs={22} md={16} lg={12} xl={12}
        className="wrapper">
          <Card bordered="false" class= 'inner'>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h3>Contact Form</h3>
                          <p>Get back to us with the required information</p>
                          <p>Note: Your information is Secure and 100% safe with us</p>
                          <br/>
                          <label className="form-group">
                        <input type="text" 
                               className="form-control"  
                               required 
                               onChange={this.onChange('name')} 
                               value={user_details.name}/>
						<span>Your Full Name</span>
						<span className="border"></span>
					</label>
                    <label className="form-group" >
                        <textarea name="" 
                                  id="" 
                                  className="form-control" 
                                  required
                                  onChange={this.onChange('residential_address')}
                                  value={user_details.residential_address}/>
						<span>Residential Address</span>
						<span className="border"></span>
					</label>
                    <Row  gutter={8}>
                        <Col span={12}>
                        <DatePicker onChange={this.onChangeDate}
                                    placeholder="Date of Birth"
                                    style={Styles.datePicker}>

                       </DatePicker>
                        </Col>
                        <Col span={12}>
                             <Select style={Styles.select} 
                                     defaultValue="Male"
                                     showArrow
                                     onChange={this.onChangeSelect('gender')}>
                                 <Option value="Male">Male</Option>
                                 <Option value="Female">Female</Option>
                             </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row  gutter={8}>
                        <Col span={6}>
                        <Select style={Styles.select} 
                                defaultValue="Cash"
                                showArrow
                                onChange={this.onChangeSelect('cash_check')}>
                                 <Option value="Cash">Cash</Option>
                                 <Option value="Check">Check</Option>
                             </Select>
                        </Col>
                        <Col span={18}>
                        <Form.Item label="Monthly Income">
            {getFieldDecorator('Income', {
              rules: [{ required: true, message: 'Please input your monthly Income!' }],
            })(<Input addonBefore={currencySelector} style={{ width: '100%' }} />)}
          </Form.Item>      
                            
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={8}>
                        <Col span={15}>
                        <label className="form-group">
                        <input type="email" 
                               className="form-control"  
                               required
                               onChange={this.onChange('email')}
                               value={user_details.email}
                               />
						<span >Email</span>
						<span className="border"></span>
					</label>
                        
                        </Col>
                        <Col span={9}>
                        <Select style={Styles.select} 
                                defaultValue="Single" 
                                showArrow
                                onChange={this.onChangeSelect('marital_status')}>
                                 <Option value="Single">Single</Option>
                                 <Option value="Married">Married</Option>
                             </Select>
                        </Col>
                    </Row>
					<Row >
                        <Col span={9}>
                        <label className="form-group">
            <input type="text" 
                   className="form-control"  
                   required
                   onChange={this.onChange('occupation')}
                   value={user_details.occupation}/>
						<span for="">Occupation</span>
						<span class="border"></span>
					</label>
                        </Col>
                        <Col span={15}>
                        <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={codeSelector} style={{ width: '100%' }} />)}
          </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" style={Styles.button}>
            Submit
          </Button>
    
          
        </Form>
        </Card>
                </Col>
                <Col span={8} xs={1} md={4} lg={6} xl={6}/>
            </Row>
            <Footer1
            id="Footer1_0"
          key="Footer1_0"
             dataSource={Footer10DataSource}
             isMobile={this.state.isMobile}
            />
           </div>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  export default WrappedRegistrationForm


const Styles ={
    datePicker:{
       width:'100%' ,
       borderColor:'1px solid aqua'
    },
    select:{
       width:'100%'
    },
    button:{
      marginLeft:'auto',
      display: 'flex'
    }
}
