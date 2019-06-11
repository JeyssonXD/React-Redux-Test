import React,{Component} from 'react';
import {connect} from 'react-redux';
//import PropTyes from 'prop-types';

class PersonPage extends Component{

    render(){
        return(
            <div>
                <h1>All person show data</h1>
            </div>
            );
    }
}

export default connect(null,{})(PersonPage);