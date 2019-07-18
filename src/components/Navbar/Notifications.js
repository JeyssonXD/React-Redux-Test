import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {MenuItem,NavDropdown,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionAddNotification} from '../../actions/actionNotification';
//style
require('../../../src/assets/styles/style.css');


class Notifications extends Component{

  state = {
    notifications : []
  }

  componentWillReceiveProps=(nextProps)=>{
    if(nextProps.notifications!=null){
      this.setState({notifications:nextProps.notifications})
    }
  }

  componentDidMount(){
    //first Time
    //add new notification
    this.props.actionAddNotification(this.props.notification);
  }

  componentDidUpdate(){
    //add new notification
    this.props.actionAddNotification(this.props.notification);
  }

  render(){
    let { notifications } = this.state;
    return (
        <NavDropdown  title={<i className={"fa fa-bell itemBell color-yellow" } />} id="basic-nav-dropdown">
          {!!notifications && notifications.map((item)=>{
            return <MenuItem key={item.id} componentClass={Link} href={item.link} to={item.link}><Glyphicon glyph="exclamation-sign" />{item.text}</MenuItem>
          })}
        </NavDropdown>
    );
  }
}

Notifications.propsTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
}

const mapStateToProps = (state) =>{
  if(!state.Notification!=null){
    return { notifications : state.Notification}
  }
  return {notifications :null}
}

export default  connect(mapStateToProps,{actionAddNotification})(Notifications);