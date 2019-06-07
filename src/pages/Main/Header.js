import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';

const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility
}) => (
    <Navbar fluid={true}>
      <Navbar.Header>
        <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={toggleMobileNavVisibility}>
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </Navbar.Header>

      <Navbar.Collapse>

        <Nav>
          <NavItem ><NavLink to="/"><i className="fa fa-home"></i>Home</NavLink></NavItem>
          <NavDropdown title={<i className="fa fa-file-download" />} id="basic-nav-dropdown">
            <MenuItem>Export at Excel</MenuItem>
          </NavDropdown>
        </Nav>
        <div className="separator"></div>
        <Navbar.Form pullLeft>
          <FormGroup>
            <span className="input-group-addon"><i className="fa fa-search"></i></span>
            <FormControl type="text" placeholder="search person for id" />
          </FormGroup>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem>
            <i className="pe-7s-next-2"></i>
            Log out
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});

export default connect(null, mapDispatchToProp)(Header);