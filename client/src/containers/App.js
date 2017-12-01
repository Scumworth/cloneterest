import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../components/Header';
import Footer from './../components/Footer';
import LandingPage from './../components/LandingPage';

class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path = "/" render = { () => <LandingPage /> } />
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
