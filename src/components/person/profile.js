import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//api
import {actionDeletePerson} from '../../actions/ActionPerson';
//web components
import { ListGroup,ListGroupItem,Glyphicon,Row,Col,DropdownButton,MenuItem,Modal,Button } from 'react-bootstrap';

class profile extends Component {

        state={
                showModalDelete:false
        }

        //#region Modal Delete
        handleShowModalDelete=()=>{
                this.setState({showModalDelete:true});
        }
        handleCloseModalDelete=()=>{
                        //close modal
                        this.setState({showModalDelete:false});
        }
        deletePerson = async() =>{
                try{
                        var person = {person:{ id : this.props.person.id}};
                        await this.props.actionDeletePerson(person);
                        //close modal
                        this.setState({showModalDelete:false});
                }catch(error){
                        console.log(error);
                        alert("error network to save changes");
                }
        }
        //#endregion

        render(){
        const { person } = this.props;
        return(
        <Row>
                <Col lg={8} xs={12}>
                        <ListGroup>
                        <ListGroupItem><b>name :</b> {person.name}</ListGroupItem>
                        <ListGroupItem><b>age :</b> {person.age}</ListGroupItem>
                        <ListGroupItem><b>active :</b> {person.active?<Glyphicon glyph="ok"/>:<Glyphicon glyph="ban-circle"/>}</ListGroupItem>
                        </ListGroup>
                </Col>
                <Col lg={4} xs={12}>
                        <div>
                                <DropdownButton id={person.id} title="options">
                                        <li role="presentation" ><Link to={"/person/edit/"+person.id} ><Glyphicon glyph="pencil" /> Edit </Link></li>
                                        <MenuItem divider />
                                        <MenuItem  onClick={this.handleShowModalDelete} > <Glyphicon glyph="trash" /> Delete</MenuItem>
                                </DropdownButton>
                        </div>
                </Col>
 
                <Modal show={this.state.showModalDelete} onHide={this.handleCloseModalDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Delete person</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Are yoy sure of delete person with name {person.name}?</Modal.Body>
                <Modal.Footer>
                <Button  onClick={this.handleCloseModalDelete}>
                Close
                </Button>
                <Button  onClick={this.deletePerson}>
                yes, Delete
                </Button>
                </Modal.Footer>
                </Modal>

        </Row>          
        );
        }
}

profile.propTypes = {
        person : PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                age: PropTypes.number.isRequired,
                active: PropTypes.bool.isRequired
        }).isRequired
}

export default connect(null,{actionDeletePerson})(profile);
