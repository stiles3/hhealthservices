import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {enquireScreen} from 'enquire-js'
import Home from './Home';
import FillForm from './component/FillForm'
import AdminHome from './component/admin/component/AdminHome'
import AdminLog from './component/admin/auths/AdminLog'
import AdminReg from './component/admin/auths/AdminReg'
import PrivateRoute from './component/admin/PrivateRoute'
import PublicRoute from './component/admin/PublicRoute'

let isMobile;
enquireScreen((b) => {
    isMobile = b
})

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isMobile,
        }
    }


   componentWillMount(){ 
        enquireScreen((b) => {
            this.setState({isMobile: !!b})
        })
    }
  render() {
    return (
        <Router>
            <Switch>
                      
                <PublicRoute exact path="/" component={Home}/>
                <PublicRoute exact path="/contact_form" component={FillForm}/>
                <PublicRoute exact path="/admin_register" component={AdminReg}/>
                <PublicRoute exact path="/admin_login" component={AdminLog}/>
                <PrivateRoute exact path="/admin_home" component={AdminHome}/>
                <Redirect from="/dashboard" to="/admin_home" />
                <Redirect from="/userlist" to="/admin_home" />
                <Redirect from="/team" to="/admin_home" />
            </Switch>
        </Router>
      
    );
  }
}
export default App;
 