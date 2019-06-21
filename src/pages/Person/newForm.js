import React,{Component} from "react";
import {Form,FormGroup,ControlLabel,FormControl,HelpBlock,Button,Glyphicon} from 'react-bootstrap';
import  '../../assets/styles/style.css';
import SwitchControl from 'components/Switch';
class newForm extends Component{
  
  state={
    name:'',
    age:null,
    active:false,
    errors:{},
    loading:false
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

  onSubmit = e =>{
    e.preventDefault();
    const errors = this.validate(this.state);
    this.setState({errors});
    if (Object.keys(errors).length === 0){
        
    }
  };

  render(){
    const { name,age,active,errors} = this.state;
    return  (
      <div className="box-container">
      <Form onSubmit={this.onSubmit} >
        
        <h3><Glyphicon glyph="user" /> Add person</h3>
        
        <FormGroup controlId="name"  validationState={!!errors.name?"error":""}> 
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

        <FormGroup controlId="age" validationState={!!errors.age?"error":""}> 
          <ControlLabel>Age</ControlLabel>
          <FormControl 
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
          <Button className="layer-center" bsStyle="primary"  type="submit"> <Glyphicon glyph="floppy-disk"/> Save</Button>
        </div>

      </Form>
      </div>
    )
  }
  
}

export default newForm;