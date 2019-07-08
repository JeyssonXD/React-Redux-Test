import React, {Component} from 'react';
import {connect} from 'react-redux';
import { actionFetchPerson,actionUpdatePerson } from '../../actions/ActionPerson';
import  EditForm  from './editForm';
import {withRouter} from "react-router-dom";

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

  saveChange = async(id,name,age,active)=>{
    age = Number(age);
    return await this.props.actionUpdatePerson({person:{id,name,age,active}});
  }

  render(){
    return(
      <div className="content">
      <div className="container-fluid">
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <div className="card">
            <EditForm person={this.props.person} updatePerson={this.saveChange}/>
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

export default withRouter(connect(mapStateToProps,{actionFetchPerson,actionUpdatePerson})(edit));