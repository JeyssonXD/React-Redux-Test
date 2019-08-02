import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {MenuItem,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//style
require('../../../src/assets/styles/style.css');


class Notifications extends Component{


  componentDidMount(){
    this.props.subscribeToNewNotification();
  }


  render(){
    const {notifications} = this.props;
    return (
        <div className="box-container navDropDown-large">
          {!!notifications && notifications.map((item,index)=>{
              if(notifications.length-index<5)
                return <div key={item.id} ><MenuItem  componentClass={Link} href={item.link} to={item.link}><Glyphicon glyph="exclamation-sign" /> {item.text}</MenuItem><hr/></div>
              return null;
          })}
         <div key={-1}><MenuItem   componentClass={Link} href="/notifications" to="/notifications"><Glyphicon glyph="th-list" /> show All notifications</MenuItem></div>
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

export default  Notifications;