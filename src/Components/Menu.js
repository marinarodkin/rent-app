import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux'
import {actSetAddNewActive} from "./../reducers/actions_creators.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Invoices from "./Invoices";
import Customers from "./Customers";
import Products from "./Products";
import AddNew from "./AddNew/AddNewInvoice";
import {actIsInvoiceMenu} from "./../reducers/actions_creators";

class Menu extends Component {
    render() {

        return (
            <Router>
                <Fragment>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">

                            <div className="collapse navbar-collapse" id="navbar-main">

                                <ul className="nav navbar-nav">
                                    <li><Link to='/'>Активные заказы</Link></li>
                                    <li><Link to='/customers'>Клиенты</Link></li>
                                    <li><Link to='/products'>Инструменты</Link></li>
                                    <li><Link to='/history'>История Заказов</Link></li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                    <Route exact path='/' render={(props) => (<Invoices {...props} isMenu={true} />)} />
                    <Route path='/customers' component={Customers}/>
                    <Route path='/products' component={Products}/>
                    <Route path='/history' render={(props) => (<Invoices {...props} isMenu={false} />)}/>
                </Fragment>
            </Router>
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
        actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
        actIsInvoiceMenu: payload => dispatch(actIsInvoiceMenu(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

