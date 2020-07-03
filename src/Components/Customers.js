import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  actSetAddNewActive,
  actDeleteCustomer,
  actStartEditingCustomer,
  actCustomerModalShow,
  actGetCustomers,
  fetchCustomers,fetchDeleteCustomers,
} from "./../reducers/actions_creators";
import './styles.css'

class Customers extends Component {
  deleteCustomer = id => event => {
    event.preventDefault(event);
    this.props.fetchDeleteCustomers(id)
  };

  startEditCustomer = id => event => {
    event.preventDefault(event);
    this.props.actStartEditingCustomer(id);
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }


  render() {
    const { customers } = this.props.customers;

    return (
      <div className="">
        <div className="top-line top-line-inv">
          <div className=" title">Клиенты</div>
          <Button
            className="col-xs-3 pull-right"
            bsStyle="info"
            onClick={this.props.actCustomerModalShow}
          >
            Добавить клиента
          </Button>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-1 text-center">#</th>
              <th className="col-xs-1 text-center">Клиент</th>
              <th className="col-xs-1 text-center">Паспорт</th>
              <th className="col-xs-3 text-center">Адрес</th>
              <th className="col-xs-2 text-center">Телефон</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(item => (
              <tr key={item.id}>
                <td className="col-xs-1 text-center">{item.id}</td>
                <td className="col-xs-3 text-center">{item.name}</td>
                <td className="col-xs-3 text-center">{item.pass}</td>
                <td className="col-xs-3 text-center">{item.address}</td>
                <td className="col-xs-2 text-center">{item.phone}</td>
                <td className="col-xs-1 border-none" >
                  <Button className="table-button table-button--first" bsStyle="info" onClick={this.startEditCustomer(item.id)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                </td>
                <td className="col-xs-1 border-none">
                  <Button className="table-button" bsStyle="info" onClick={this.deleteCustomer(item.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    customers: store.customers
  };
}

const mapDispatchToProps = dispatch => ({
  actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
  actDeleteCustomer: payload => dispatch(actDeleteCustomer(payload)),
  actStartEditingCustomer: payload => dispatch(actStartEditingCustomer(payload)),
  actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
  fetchCustomers: payload => dispatch(fetchCustomers(payload)),
  fetchDeleteCustomers: payload => dispatch(fetchDeleteCustomers(payload)),


})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);
