import React from 'react';
import Welcome from './Welcome';
import Documentaion from './Documentation';

const Dashboard = () => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Welcome >
          </Welcome>
        </div>
        <div className="col-md-12">
          <Documentaion />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;