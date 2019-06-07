import React,{Component} from 'react';

class Documentation extends Component{
    render(){
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="col-md-12 card">
                        <h2>Documentation</h2>
                        <h5>person</h5>
                        <section>
                            <h5>the person is assing role admin also can:</h5>
                            <ul>
                                <li>add new person</li>
                                <li>list all person</li>
                            </ul>
                        </section>
                        <br/>
                        <h5>order</h5>
                        <section>
                            <h5>the person is assing role admin and distributor also can:</h5>
                            <ul>
                                <li>add new order</li>
                                <li>list all order</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Documentation;