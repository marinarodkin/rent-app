import React, { Component } from 'react';
import Invoices from './Components/Invoices.js'
import Customers from './Components/Customers.js'
import AddNew from './Components/AddNew/AddNewInvoice11.js'
import AddNewCustomer from './Components/AddNewCustomer/AddNewCustomer.js'
import AddNewProduct from './Components/AddNewProduct/AddNewProduct.js'
import AddNewInvoice from './Components/AddNew/AddNewInvoice.js'
import Menu from './Components/Menu.js'
//import Main from './Components/Main.js'
import Main from './Main.js'
import Products from './Components/Products.js'
import './App.css';
import {PageHeader} from "react-bootstrap";
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App app-container">

          <PageHeader className= "page-header">Айсберг Прокат</PageHeader>
          <Menu/>
          <AddNewCustomer/>
          <AddNewProduct/>
          <AddNewInvoice/>
          </div>
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
)(App)


