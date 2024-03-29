import React, { Component } from 'react';
import { connect } from 'react-redux';
import imagen from '../../assets/images/man.png'

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
   
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={imagen} alt={user.name} className="photo" />
          <div className="userinfo">
            <div className="username">
              {user.name}
            </div>
            <div className="title">Admin</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);