import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from 'actions/user';

class Login extends Component {
  constructor(props){
    super(props);

    this.fields = {
      username: 'username',
      password: 'password',
      remember: 'remember'
    };

    this.state = {};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.login(this.state[this.fields.username], this.state[this.fields.password]);
  }

  onInputChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  }

  render() {
    return this.props.user.isAuthenticated ? (
      <Redirect to="/"/>
    ) : (
      <form className="form-login" onSubmit={this.onFormSubmit}>
        <input type="text" name={this.fields.username} onChange={this.onInputChange} placeholder="Name or Email"  />
        <input type="password" name={this.fields.password} onChange={this.onInputChange} placeholder="Password"  />
        {/*<p><input type="checkbox" name={this.fields.remember} onChange={this.onInputChange} /> Remember me</p>*/}
        <button type="submit">Login</button>
        <p style={{fontSize: '12px'}}>*new account will be created if it doesn't already exist</p>

      </form>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);