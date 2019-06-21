import React,{Component} from 'react';
import {connect} from 'react-redux';
import {actionAddPerson} from '../../actions/ActionPerson'; 
import NewForm from './newForm';

class PersonNew extends Component{

  //save new person
  saveChange = async({name,age,active})  =>{
    try{
      return await this.props.actionAddPerson({name,age,active});
    }catch(error){
      console.log(error);
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
              <NewForm addPerson = {this.actionAddPerson} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(null,{actionAddPerson})(PersonNew)