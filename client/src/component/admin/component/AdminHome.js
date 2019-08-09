import React, {Component}from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import AdminTeam from './AdminTeam'
import Dashboard from './Dashboard'
import UsersList from './UsersList'
import { Layout, Menu, Breadcrumb, Icon, Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SomeComponent = withRouter(props => <AdminHome {...props}/>);
const routes = [
  { path: '/dashboard',
    name:'dashboard',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/team',
    name:'team',
    exact: true,
    main: () =><AdminTeam/>
  },
  { path: '/userlist',
    name:'userlist',
    exact:   true,
    main: () => <UsersList/>
  }
]

export class AdminHome extends Component {
  state = {
             collapsed: false,
           };
       onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
          };
          SomeMethod () {
            const {pathname} = this.props.location;
            console.log( pathname)
          }
      componentDidMount(){
        this.SomeMethod()
      }
  render(){
    console.log(window.location.pathname)
    return(
      <Router>
                     <Layout style={{ minHeight: '100vh' }}>
                    
         <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             <Menu.Item key="1">
               <Icon type="pie-chart" />
               <Link to='/dashboard'>Dashboard</Link>
             </Menu.Item>
             <Menu.Item key="2">
               <Icon type="user" />
                    <Link to='/userlist'>UsersList</Link>
             </Menu.Item>
             <Menu.Item key="3">
                   <Icon type="team" />
                     <Link to='/team'>Team</Link>
             </Menu.Item>
           </Menu> 
         </Sider>
        
         <Layout>
         <Header style={{ background: '#fff', padding: 0}} />
         <br/>
           <Content style={{ margin: '0 16px' }}>
             <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
             {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
         
             </div>
           </Content>
           <Footer style={{ textAlign: 'center' }}>Designed by Stiles M.A</Footer>
         </Layout>
         </Layout>
  </Router>
    )
    
  }
 
}

export default withRouter(props => <AdminHome {...props}
/>)

