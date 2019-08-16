import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Glyphicon,ListGroup} from 'react-bootstrap';
import moment from 'moment';

class Notifications extends Component{

  render(){

    const { notificationStore } =  this.props;

    return(
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="col-md-12">
              <section className="panel  box-container">
                <h2>All Notifications</h2>
              </section>
              <section className="panel box-container">
                <ListGroup variant="flush">
                {!!notificationStore && notificationStore.map((item,index)=>{
                  var past = moment(item.fecha);
                  return <Link className="list-group-item" key={item.id} to={item.link} href={item.link}><Glyphicon glyph="exclamation-sign" /> {item.text}  <span><blockquote>{moment(item.fecha).fromNow()}</blockquote></span></Link>
                })}
                </ListGroup>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps= (state) => {

  if(state.Notification!=null){
    return { notificationStore:state.Notification };
  }

  return { notificationStore:null }
}

export default connect(mapStateToProps,null) (Notifications);