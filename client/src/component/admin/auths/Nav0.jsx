import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';

const Item = Menu.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
    this.menu = React.createRef();
  }

  /*
  componentDidMount() {
    // 如果是 react 16.3 以下版本请使用 findDOMNode;
    this.menuDom = findDOMNode(this.menu);
  }
  */

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? this.menu.current.dom.scrollHeight : 0,
    });
  };

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { menuHeight, phoneOpen } = this.state;
   // const navData = dataSource.Menu.children;
   /*  const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
        <a
          {...navData[key].a}
          href={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
        </a>
      </Item>
    )); */
    return (
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['0']}
              theme={isMobile ? 'dark' : 'default'}
            >
             <Menu.Item key="1">HHS Admin</Menu.Item>
            <Menu.Item key="2">Home</Menu.Item>
            <Menu.Item key="3">Users</Menu.Item>
            <Menu.Item key="4">Add Users</Menu.Item>
            </Menu>
         
            
    );
  }
}

export default Header;
