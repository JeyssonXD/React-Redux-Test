import React,{Component} from "react";
import {Form,FormGroup,ControlLabel,FormControl,HelpBlock,Button,Glyphicon,Alert} from 'react-bootstrap';
import  '../../assets/styles/style.css';
import SwitchControl from 'components/Switch';
import PropTypes from 'prop-types';

//style
import "../../assets/styles/style.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class newForm extends Component{
  
  state={
    name:'',
    age:'',
    active:false,
    errors:{},
    loading:false,
    res:{}
  }

  validate = data =>{
    const errors = {};
    if(!data.name) errors.name = "Can't be blank";
    if(!data.age) errors.age = "Can't be blank";
    if(data.age<0 || data.age>120) errors.age = "range invalid";
    return errors;
  }

  handleChange = (e) =>{
    if(!!this.state.errors[e.target.name]){
      let errors = Object.assign({},this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]:e.target.value,
        errors
      });
    }else{
      this.setState({[e.target.name]:e.target.value});
    }
  }

  onSubmit = async(e) =>{
    try{
      e.preventDefault();
      const errors = this.validate(this.state);
      const {name,age,active} = this.state;
      this.setState({errors});
      if (Object.keys(errors).length === 0){
          this.setState({loading:true});
          var res = await this.props.addPerson(name,age,active);
          const dataRes = {};
          dataRes.code = res.data.createPerson.code;
          dataRes.message = res.data.createPerson.message;
          this.setState({loading:false,res:dataRes,name:'',age:''});
      }
    }catch(error){
      const errors = {};
      errors.request = "A problem has occurred, Network api injured"
      this.setState({errors:errors,loading:false});
      console.log(error);
    }
  };

  render(){
    const { name,age,active,errors,loading,res} = this.state;
    return  (
      <div className="box-container">
      <Form onSubmit={this.onSubmit} >
        
        <h3><Glyphicon glyph="user" /> Add person</h3>
        
        <FormGroup controlId="name"  validationState={!!errors.name?"error":null}> 
          <ControlLabel>Name</ControlLabel>
          <FormControl 
            type="text" 
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange}
          />
          {!!errors.name && <HelpBlock>{errors.name}</HelpBlock>}
        </FormGroup>

        <FormGroup controlId="age" validationState={!!errors.age?"error":null}> 
          <ControlLabel>Age</ControlLabel>
          <FormControl
            value={age}
            type="number" 
            name="age"
            id="age"
            onChange={this.handleChange}
          />
          {!!errors.age && <HelpBlock>{errors.age}</HelpBlock>}
        </FormGroup>

        <FormGroup controlId="active" > 
          <p>Active:</p>
            <SwitchControl
              value={active}
              id="active"
              name="active"
              onChange={active => this.setState({active: active})}
              onText={<i className="fa fa-check"></i>}
              offText={<i className="fa fa-times"></i>}
            />
          {!!errors.active && <HelpBlock>{errors.active}</HelpBlock>}
        </FormGroup>

        <div>
          <Button  className="layer-center" bsStyle="primary"  type="submit"> <Glyphicon glyph="floppy-disk"/> Save</Button>
          {!!loading && <div><FontAwesomeIcon className="layer-center" icon={faSpinner} spin /></div>}
          {!!errors.request && <div><br/><Alert bsStyle="danger"><strong>Error!</strong> {errors.request}</Alert></div>}
          {res.code==='CODE1000' && <div><br/><Alert  bsStyle="success"><strong>Success!</strong> {res.message}</Alert></div>}
        </div>

      </Form>
      </div>
    )
  }
  
}

newForm.propTypes = {
  addPerson: PropTypes.func.isRequired
}

export default newForm;