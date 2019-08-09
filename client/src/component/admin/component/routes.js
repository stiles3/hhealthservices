import UsersList from '../admin/UsersList'
import AdminTeam from '../admin/AdminTeam'
import Dashboard from '../admin/Dashboard'

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    // { path: '/auth/signout', exact: true, name: 'Logout', component: Logout },
    { path: '/userlist', exact: true, name: 'UsersList', component: UsersList },
    { path: '/team', exact: true, name: 'Team', component: AdminTeam },

  ];
  
  export default routes;