import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

//style
import '../../assets/styles/style.css';

class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="fa fa-home"></i>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-users"></i>
            <p>
              Person
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/person/new') ? 'active' : null}>
                  <Link to="/person/new">• add new person</Link>
                </li>
                <li className={this.isPathActive('/person') ? 'active' : null}>
                  <Link to="/person">• list of person</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li>
          <a onClick={() => this.setState({ tableMenuOpen: !this.state.tableMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-news-paper"></i>
            <p>Order <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.tableMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/order/add') ? 'active' : null}>
                  <Link to="/order/add">• add new order</Link>
                </li>
                <li className={this.isPathActive('/order/index') ? 'active' : null}>
                  <Link to="/order/index">• list of order</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);