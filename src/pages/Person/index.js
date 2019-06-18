import React,{Component} from 'react';
import {connect} from 'react-redux';
//import PropTyes from 'prop-types';
import { Query } from 'react-apollo';
import schemaPerson from '../../api/ApiTestGraphql/Person';

class PersonPage extends Component{

    render(){
        return(
            <div>
                List of persons
                <Query query={schemaPerson.query.persons()}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error :(</div>;

                        return (
                            <div>{data.people[0].name}</div> 
                        )
                    }}
                </Query>
            </div>
            );
    }
}

export default connect(null,{})(PersonPage);