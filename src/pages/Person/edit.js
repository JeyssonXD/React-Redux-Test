import React, {Component} from 'react';
import {connect} from 'react-redux';
import { actionFetchPerson } from '../../actions/ActionPerson';
import  EditForm  from './editForm';

class edit extends Component{

  state = {
    errors : {}
  }

  componentDidMount= async()=>{
    try{
      if(this.props.match.params.id){
        await this.props.actionFetchPerson(this.props.match.params.id);
      }
    }catch(err){
      this.setState({errors:"problem network api"});
    }
  }

  render(){
    return(
      <div className="content">
      <div className="container-fluid">
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <div className="card">
            <EditForm person={this.props.person}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state,props) =>{
  if(props.match.params.id){
    return {
      person: state.Person.find(x=>x.id===props.match.params.id)
    }
  }
  return {person:null};
}

export default connect(mapStateToProps,{actionFetchPerson})(edit);