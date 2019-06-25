import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//web components
import { ListGroup,ListGroupItem,Glyphicon,Row,Col,DropdownButton,MenuItem } from 'react-bootstrap';

class profile extends Component {


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
                                <DropdownButton id="1" title="options">
                                        <li role="presentation" ><Link to={"/person/"+person.id} ><Glyphicon glyph="pencil" /> Edit </Link></li>
                                        <MenuItem divider />
                                        <MenuItem eventKey="4"> <Glyphicon glyph="trash" /> Delete</MenuItem>
                                </DropdownButton>
                        </div>
                </Col>
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

export default profile;
