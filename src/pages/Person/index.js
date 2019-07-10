import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Query } from 'react-apollo';
import {Link,withRouter} from 'react-router-dom';
//style
import "../../assets/styles/style.css";
//schema
import schemaPerson from '../../api/ApiTestGraphql/Person';
//actions
import { actionSetPerson } from '../../actions/ActionPerson';
//web components
import { ListGroup,ListGroupItem,Alert,HelpBlock } from 'react-bootstrap';
import Profile from '../../components/person/profile';
import { Row,Col,Form,FormControl,FormGroup,ControlLabel,Button,Glyphicon } from 'react-bootstrap';
import SwitchControl from 'components/Switch';
import ReactPaginate from 'react-paginate';
//style
import "../../assets/styles/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';




class PersonPage extends Component{

    state={
        name:"",
        age:"",
        active:false,
        view:{},
        errors:{},
        loading:false,
        pageCurrent:1,
        count:1,
        currentActive:false
      }

    componentDidMount=()=>{
        //set null view exeption pageCurrent
        var view = this.constructViewparams({},1);
        this.setState({view:view});
    }

    onSearch = (e) =>{
        const errors = this.validate(this.state);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.setState({currentActive:true},()=>{
                var view = this.constructViewparams(this.state,1);
                this.setState({view:view});
            });
            
        }
    }

    validate = data =>{
        const errors = {};
        if(data.age){
            if(data.age<1 || data.age>120)errors.age = "range invalid";
        }
        return errors;
      }

    constructViewparams = (data,selected) =>{
        //contructor of view params for query
        const params = {};
        const { name,age,active,currentActive} = data;
        params['view'] = {pageCurrent:selected};
        if(name) params['view']={...params['view'],name};
        if(age){ var ageNumber=Number(age) ;params['view']={...params['view'],age:ageNumber};}
        console.log(currentActive);
        if(currentActive) params['view']={...params['view'],active:active};
        return params;
    }

    handleChange = (e) =>{
        //on change set state of value input's 
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

    handlePageClick = (data) =>{
        let selected = data.selected+1;
        //click on change of page
        var view = this.constructViewparams(this.state,selected);
        this.setState({view:view});
    }

    render(){
        const {persons} = this.props;
        const {name,age,active,errors,view,pageCurrent,count} = this.state;
        return(
            <div>
                <div className="content">
                <div className="container-fluid">
                <div className="col-md-12">
                <h2>Persons <Link className="btn primary" to="/person/new">new</Link></h2>
                {/*form basic search for paging*/}
                <section className="panel  box-container">
                    <Form >
                        <Row>
                            <Col lg={3} xs={12}>
                                <FormGroup controlId="name"  > 
                                <ControlLabel>Name</ControlLabel>
                                <FormControl 
                                    value={name}
                                    placeholder="name"
                                    type="text" 
                                    name="name"
                                    id="name"
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                            </Col>
                            <Col lg={3} xs={12}>
                                <FormGroup controlId="age"  validationState={!!errors.age?"error":null}> 
                                <ControlLabel>Age</ControlLabel>
                                <FormControl
                                    value={age} 
                                    placeholder="age"
                                    type="number" 
                                    name="age"
                                    id="age"
                                    onChange={this.handleChange}
                                />
                                {!!errors.age && <HelpBlock>{errors.age}</HelpBlock>}
                                </FormGroup>
                            </Col>
                            <Col lg={1} xs={12}>
                                <FormGroup controlId="active"  > 
                                <ControlLabel>active</ControlLabel>
                                <SwitchControl
                                value={active}
                                id="active"
                                name="active"
                                onChange={active => this.setState({active: active})}
                                onText={<i className="fa fa-check"></i>}
                                offText={<i className="fa fa-times"></i>}
                                />
                                </FormGroup>
                            </Col>
                            <Col lg={3} xs={12}>
                                <FormGroup controlId="submit" > 
                                    <div className="layer-center box-container" >
                                    <Button onClick={this.onSearch}  bsStyle="primary" >Search <Glyphicon glyph="search" /></Button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </section>
                {/*Query for high order using apollo client*/}
                <Query variables={view} box query={schemaPerson.query.persons()}  onCompleted={data=>{this.props.actionSetPerson(data.persons.persons);this.setState({count:data.persons.count});}}>
                    {({ error,data,loading }) => {

                        if (loading){ return <div ><FontAwesomeIcon className="layer-center" icon={faSpinner} spin size="6x" /></div>}

                        if (error){ return <div><Alert bsStyle="danger"><strong>went wrong sorry!</strong> can promblems network configuration, contact with administrator</Alert></div> }

                        return (
                            <ListGroup>
                            { persons.map((person)=>{
                                return <ListGroupItem key={person.id}><Profile person={person}  /></ListGroupItem>
                            })}
                            </ListGroup>
                        )
                    }}
                </Query>
                {/*paginate component*/}
                <ReactPaginate
                initialPage={pageCurrent-1}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(count/10)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                />
                </div>
                </div>
                </div>
            </div>
            );
    }

}

const mapStateToProps = (state,props)=> {
    return{
        persons:state.Person
    };
}


export default withRouter(connect(mapStateToProps,{actionSetPerson})(PersonPage));