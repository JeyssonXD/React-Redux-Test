import React,{Component} from 'react';

class Welcome extends Component{

    render(){
        return(
        <div className="content">
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Welcome to System of Test - React-Redux</h4>
                            <p className="category">this system is a test of apollo-client get api graphql</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Welcome;