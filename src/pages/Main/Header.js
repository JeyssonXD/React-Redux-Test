import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl,Alert } from 'react-bootstrap';
import Notifications from '../../components/Navbar/Notifications';
//api definition
import schemaNotification from '../../api/ApiTestGraphql/Notification/index';
//apollo
import {Query} from 'react-apollo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
//style
require('../../../src/assets/styles/style.css');


class Header extends Component{

  state = {
    alerted : false
  }

  addNotificationProps = ({createPerson:{person}}) =>{
    return {id:"personNotification"+person.id,text:"New Person: "+person.name,link:"/person/edit/"+person.id};
  }

  alerted = ({notifications}) =>{
    if(notifications.length>0){
      this.setState({alerted:true})
    }
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
         
          {/**notification */}
          <NavDropdown  title={<i className={ alerted?"fa fa-bell itemBell color-yellow  ":"fa fa-bell" } />} id="basic-nav-dropdown">
            <Query query={schemaNotification.query.notifications()} fetchPolicy="network-only" onCompleted={data=>{this.alerted(data)}} >
            {({ error,loading,data,subscribeToMore }) => {
              
              if (loading){ return <div ><FontAwesomeIcon className="layer-center" icon={faSpinner} spin />loading</div>}

              if (error){console.log(error); return <div><Alert bsStyle="danger"><strong>went wrong sorry!</strong> can promblems network configuration, contact with administrator</Alert></div> }
              
              if(data==null && data.notifications==null){
                return (
                  <MenuItem>Not have notifications</MenuItem>);
              }else{
                return (
                    <Notifications   notifications={data.notifications} subscribeToNewNotification={()=>subscribeToMore({
                      document: schemaNotification.subscription.notification(),
                      updateQuery: (prev,{subscriptionData })=>{
                        if(!subscriptionData.data) return prev;
                        const newFeedNotification = subscriptionData.data.notification;
                        var notifications = {
                          notifications : [
                            ...prev.notifications,
                            {...newFeedNotification}
                          ],
                        };
                        return notifications;
                      }
                    })} />
                  );
              }
            }}
            </Query>
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
  if(state.Notification!=null){
    return { notifications: state.Notification}
  }
  return { notifications:null};
}

export default connect(mapStateToProps,{toggleMobileNavVisibility})(Header);