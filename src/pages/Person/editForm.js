import React,{Component} from 'react';
import {Form,FormGroup,ControlLabel,FormControl,HelpBlock,Button,Glyphicon,Alert} from 'react-bootstrap';
import  '../../assets/styles/style.css';
import SwitchControl from 'components/Switch';
import PropTypes from 'prop-types';

//style
import "../../assets/styles/style.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class editForm extends Component{
  
  state={
    id:this.props.person.id,
    name:this.props.person.name,
    age:this.props.person.age,
    active:this.props.person.active,
    errors:{},
    loading:false,
    res:{}
  }

  componentWillReceiveProps= (nextProps) =>{
    if(nextProps.person!=null){
      this.setState({
        id:nextProps.person.id,
        name:nextProps.person.name,
        age:nextProps.person.age,
        active:nextProps.person.active
      });
    }
  }

  render(){
    const { name,age,active,errors,loading,res} = this.state;
    return  (
      <div className="box-container">
      <Form onSubmit={this.onSubmit} >
        
        <h3><Glyphicon glyph="user" /> Edit person</h3>
        
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

editForm.propTypes = {
  person : PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
  })
}

export default editForm;