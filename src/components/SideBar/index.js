import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import Nav from './Nav';

//style
import '../../assets/styles/style.css';

class SideBar extends Component {

  state = {};

  render() {
    let {
      backgroundColor,
      backgroundImage
    } = this.props;

    return (
      <div className="sidebar" data-color={backgroundColor} data-image={backgroundImage}>
        <div className="brand">
          <section className="box-title">
          <h3 className="brand-name title-home" >
            <u>
            APP-Test
            </u>
          </h3>
          </section>
        </div>
        <div className="sidebar-wrapper">
          <UserInfo />
          <div className="line"></div>
          <Nav />
        </div>
        <div className="sidebar-background">
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);