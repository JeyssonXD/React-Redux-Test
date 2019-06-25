import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Query } from 'react-apollo';
import {Link} from 'react-router-dom';
//style
import "../../assets/styles/style.css";
//schema
import schemaPerson from '../../api/ApiTestGraphql/Person';
//actions
import { actionSetPerson } from '../../actions/ActionPerson';
//web components
import { ListGroup,ListGroupItem,Alert } from 'react-bootstrap';
import Profile from '../../components/person/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


class PersonPage extends Component{



    render(){
        return(
            <div>
                <div className="content">
                <div className="container-fluid">
                <div className="col-md-12">
                <h2>Persons <Link className="btn primary" to="/person/new">new</Link></h2>
                <Query box query={schemaPerson.query.persons()}>
                    {({ error,data,loading }) => {

                        if (loading){ return <div ><FontAwesomeIcon className="layer-center" icon={faSpinner} spin size="6x" /></div>}

                        if (error){ return <div><Alert bsStyle="danger"><strong>went wrong sorry!</strong> can promblems network configuration, contact with administrator</Alert></div> }

                        //initial state
                        this.props.actionSetPerson(data.people);
                    
                        return (
                            <ListGroup>
                            { data.people.map((person)=>{
                                return <ListGroupItem key={person.id}><Profile person={person}  /></ListGroupItem>
                            })}
                            </ListGroup>
                        )
                    }}
                </Query>
                </div>
                </div>
                </div>
            </div>
            );
    }

}


export default connect(null,{actionSetPerson})(PersonPage);