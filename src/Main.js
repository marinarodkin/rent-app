import React, { Component } from 'react';
import Invoices from './Components/Invoices.js'
import Customers from './Components/Customers.js'

import Products from './Components/Products.js'
import './App.css';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom'

class Main extends Component {
  render() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Invoices}/>
                <Route exact path='/customers' component={Customers}/>
                <Route exact path='/products' component={Products}/>
            </Switch>
        </main>
    );
  }
}


const mapStateToProps = store => {
    return {
        invoices: store.invoices,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)


