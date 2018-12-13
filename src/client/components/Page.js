import React from 'react';
import { Switch, Route } from 'react-router';

import Header from 'components/widgets/Header';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Login from 'components/pages/Login';
import NotFound from 'components/pages/NotFound';

const Page = () => (
  <div className="main">
    <Header />
    <div className="container">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </div>
);

export default Page;