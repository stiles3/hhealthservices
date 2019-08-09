/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';

import Banner2 from './Banner2';
import Nav0 from './Nav0';
import Content0 from './Content0';
import Content1 from './Content1';
import Content3 from './Content3';
import Contact0 from './Contact0';
import Footer1 from './Footer1';
import Point from './Point';
import {
  Banner20DataSource,
  Nav00DataSource,
  Content00DataSource,
  Content10DataSource,
  Content30DataSource,
  Contact00DataSource,
  Footer10DataSource,
} from './data.source';
import './less/antMotionStyle.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port,
    };
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

  render() {
    const children = [
  
      <Nav0
        id="Nav0_0"
        key="Nav0_0"
        dataSource={Nav00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner2
        id="Banner2_0"
        key="Banner2_0"
        dataSource={Banner20DataSource}
        isMobile={this.state.isMobile}
      />,
      
      <Content0
        id="Content0_0"
        key="Content0_0"
        dataSource={Content00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content1
        id="Content1_0"
        key="Content1_0"
        dataSource={Content10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content3
        id="Content3_0"
        key="Content3_0"
        dataSource={Content30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Contact0
        id="Contact0_0"
        key="Contact0_0"
        dataSource={Contact00DataSource}
        isMobile={this.state.isMobile}
     />,
     <Footer1
       id="Footer1_0"
     key="Footer1_0"
        dataSource={Footer10DataSource}
        isMobile={this.state.isMobile}
       />,
      <Point
        key="list"
        data={[
          'Nav0_0',
          'Banner2_0',
          'Content0_0',
          'Content1_0',
          'Content3_0',
          'Contact0_0',
          'Footer1_0',
        ]}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {this.state.show && children}
      </div>
    );
  }
}
