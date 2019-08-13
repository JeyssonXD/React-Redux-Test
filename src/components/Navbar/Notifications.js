import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {MenuItem,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//state
import {actionFetchNotification} from '../../actions/actionNotification';

import {connect} from 'react-redux';

//style
require('../../../src/assets/styles/style.css');


class Notifications extends Component{


  componentDidMount(){
    this.props.subscribeToNewNotification();
    //redux save
    this.props.actionFetchNotification(this.props.notifications);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notifications!==this.props.notifications){
      //redux save
      this.props.actionFetchNotification(nextProps.notifications);
    }
  }


  render(){
    const {notificationStore} = this.props;
    return (
        <div className="box-container navDropDown-large">
          {!!notificationStore && notificationStore.map((item,index)=>{
              if(notificationStore.length-index<5)
                return <div key={item.id} ><MenuItem  componentClass={Link} href={item.link} to={item.link}><Glyphicon glyph="exclamation-sign" /> {item.text}</MenuItem><hr/></div>
              return null;
          })}
         {notificationStore.length>0 && 
          <div key={-1}><MenuItem   componentClass={Link} href="/notifications" to="/notifications"><Glyphicon glyph="th-list" /> show All notifications</MenuItem></div>}
         {notificationStore.length===0 && 
          <div key={-1}><MenuItem><Glyphicon glyph="inbox" /> Not have notifications</MenuItem></div>
         }
        </div>
    );
  }
}

Notifications.propsTypes = {
  notifications: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }),
  subscribeToNewNotification: PropTypes.func.isRequired
}

const mapStateToProps=(state)=>{
  if(state.Notification!=null){
    return {notificationStore:state.Notification};
  }
  return {notificationStore:null};
}

export default  connect(mapStateToProps,{actionFetchNotification})(Notifications);