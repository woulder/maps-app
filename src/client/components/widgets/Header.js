import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { user, router } = this.props;
    const path = router.location.pathname;

    const conditionalLink = user.isAuthenticated ? (
      <span>{user.username}</span>
    ) : (
      <Link to="/login" className={path === '/login' ? 'active' : ''}>Log in</Link>
    );

    return (
      <div className="header">
        <div className="container">
          <ul className="navigation">
            <li className="navigation-item">
              <Link to="/" className={path === '/' ? 'active' : ''}>Main</Link>
            </li>
            <li className="navigation-item">
              <Link to="/about" className={path === '/about' ? 'active' : ''}>About</Link>
            </li>
            <li className="navigation-item pull-right">
              {conditionalLink}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, router }) => ({ user, router });

export default connect(mapStateToProps)(Header);