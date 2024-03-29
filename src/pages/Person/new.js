import React,{Component} from 'react';
import {connect} from 'react-redux';
import {actionAddPerson} from '../../actions/ActionPerson'; 
import NewForm from './newForm';
import {withRouter} from 'react-router-dom';

class PersonNew extends Component{

  //save new person
  saveChange = async(name,age,active)  =>{
    try{
      age = Number(age);
      return await this.props.actionAddPerson({person:{name,age,active}});
    }catch(error){
      throw error;
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
              <NewForm addPerson ={this.saveChange}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null,{actionAddPerson})(PersonNew));