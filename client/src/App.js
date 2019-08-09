import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {enquireScreen} from 'enquire-js'
import Home from './Home';
import FillForm from './component/FillForm'
import AdminHome from './component/admin/component/AdminHome'
import AdminLog from './component/admin/auths/AdminLog'
import AdminReg from './component/admin/auths/AdminReg'

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
                      
                <Route exact path="/" component={Home}/>
                <Route exact path="/contact_form" component={FillForm}/>
                <Route exact path="/admin_register" component={AdminReg}/>
                <Route exact path="/admin_login" component={AdminLog}/>
                <Route exact path="/admin_home" component={AdminHome}/>
                <Redirect from="/dashboard" to="/admin_home" />
                <Redirect from="/userlist" to="/admin_home" />
                <Redirect from="/team" to="/admin_home" />
            </Switch>
        </Router>
      
    );
  }
}
export default App;
 