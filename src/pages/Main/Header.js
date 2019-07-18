import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { actionAddNotification} from '../../actions/actionNotification';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl,Alert,Glyphicon } from 'react-bootstrap';
import Notifications from '../../components/Navbar/Notifications';
//api definition
import api from '../../api/ApiTestGraphql/Person/index';
//apollo
import {Subscription} from 'react-apollo';

//style
require('../../../src/assets/styles/style.css');

class Header extends Component{

  addNotificationProps = ({createPerson:{person}}) =>{
    return {id:"personNotification"+person.id,text:"New Person: "+person.name,link:"/person/edit/"+person.id};
  }


  render(){

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
         
          {/**notification susbcription new person add*/}
          <Subscription  subscription={api.subscription.createPerson()} >
          {({ error,loading,data }) => {

          if (loading){ 
            if(this.props.notifications!=null && this.props.notifications.length>0){ 
              console.log(this.props.notifications);
              return <NavDropdown  title={<i className={"fa fa-bell itemBell color-yellow" } />} id="basic-nav-dropdown">
                    {this.state.notifications.map((item)=>{
                      return <MenuItem key={item.id} componentClass={Link} href={item.link} to={item.link}><Glyphicon glyph="exclamation-sign" />{item.text}</MenuItem>
                    })}
                    </NavDropdown>}  
            else{ 
              return  <NavDropdown  title={<i className="fa fa-bell" />} id="basic-nav-dropdown"><MenuItem >Not have notifications</MenuItem></NavDropdown>
            }
          }
            if (error){ return <div><Alert bsStyle="danger"><strong>went wrong sorry!</strong> can promblems network configuration, contact with administrator</Alert></div> }
            
              let notification = this.addNotificationProps(data);
              return <Notifications notification={notification}/>
          }}
          </Subscription>
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
  if(state.Notification!=null){
    return { notifications: state.Notification}
  }
  return { notifications:null};
}

export default connect(mapStateToProps,{toggleMobileNavVisibility,actionAddNotification})(Header);