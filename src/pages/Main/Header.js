import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { actionAddNotification} from '../../actions/actionNotification';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl,Alert } from 'react-bootstrap';

//api definition
import api from '../../api/ApiTestGraphql/Person/index';
//apollo
import {Subscription} from 'react-apollo';

//style
require('../../../src/assets/styles/style.css');

class Header extends Component{

  state={
    alerted:false
  }

  render(){

    const { alerted } = this.state;

    return(
      <Navbar fluid={true}>
      <Navbar.Header>
        <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={this.props.toggleMobileNavVisibility}>
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav>
          <NavItem componentClass={Link} href="/" to="/"><i className="fa fa-home"></i>Home</NavItem>
          <NavDropdown title={<i className="fa fa-file-download" />} id="basic-nav-dropdown">
            <MenuItem>Export at Excel</MenuItem>
          </NavDropdown>
          <NavDropdown title={<i className={alerted?"fa fa-bell itemBell primary" :"fa fa-bell"} />} id="basic-nav-dropdown">
          {/**notification susbcription new person add*/}
          <Subscription  subscription={api.subscription.createPerson()}>
          {({ error,loading,data }) => {

            if (loading){ return <MenuItem >No hay notificaciones</MenuItem>}
            if (error){ return <div><Alert bsStyle="danger"><strong>went wrong sorry!</strong> can promblems network configuration, contact with administrator</Alert></div> }
            
            this.props.actionAddNotification({notification:{text:"New Person"+data.createPerson.person.name,link:"/person/edit/"+data.createPerson.person.id}});
            return  <MenuItem  componentClass={Link}  to={"/person/edit/"+data.createPerson.person.id}> </MenuItem>

          }}
          </Subscription>
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
  }
}

const mapStateToProps = (state) => {
  if(state.notification!=null){
    return { notifications: state.notification}
  }
  return { notifications:null};
}

export default connect(mapStateToProps,{toggleMobileNavVisibility,actionAddNotification})(Header);