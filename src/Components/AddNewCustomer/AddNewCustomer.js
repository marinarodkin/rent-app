import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  actChangeInputCustomerValue,
  actChangeInputValue,
  actCustomerModalShow,
  actCustomerModalHide,
  fetchPutCustomers,
  fetchEditCustomers
} from '../../reducers/actions_creators';
import './styles.css';

class AddNewCustomer extends Component {
  state = {
    customerName: '',
    customerPass: '',
    customerAddress: '',
    customerPhone: ''
  };


  componentWillReceiveProps(nextProps) {
    const { editingCustomer, customerName, customerPass, customerAddress, customerPhone } = nextProps.customers;
    if (editingCustomer !== 0) {
      this.setState({
        customerName: customerName,
        customerPass: customerPass,
        customerAddress: customerAddress,
        customerPhone: customerPhone
      });
    }
  }

  changeInputCustomerValue = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  finishEditCustomer = id => (event) => {
    event.preventDefault(event);
    const newCustomer = {
      name: this.state.customerName,
      pass: this.state.customerPass,
      address: this.state.customerAddress,
      phone: this.state.customerPhone
    };
    this.setState({
      customerName: '',
      customerPass: '',
      customerAddress: '',
      customerPhone: '',
    });
    this.props.fetchEditCustomers({ id, newCustomer });
  };

  addNewCustomer = () => (event) => {
    const { customerName, customerPass, customerAddress, customerPhone } = this.state;
    event.preventDefault(event);
    const newCustomer = {
      name: customerName,
      pass: customerPass,
      address: customerAddress,
      phone: customerPhone
    };
    this.setState({
      customerName: '',
      customerPass: '',
      customerAddress: '',
      customerPhone: ''
    });
    this.props.fetchPutCustomers(newCustomer);
  };


  cancelEditing = () => {
    this.setState({
      customerName: '',
      customerPass: '',
      customerAddress: '',
      customerPhone: ''
    });
    this.props.actCustomerModalHide();
  };


  //  TODO: fix Eslint

  render() {
    return (
      <div className="static-modal add-customer-modal">
        <Modal show={this.props.customers.customerModalShow}
               onHide={this.props.actCustomerModalHide}>
          <Modal.Header>
            <Modal.Title>Добавить нового клиента</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Form className="add-form">
            <FormGroup>
              <ControlLabel className="col-xs-4">ФИО:</ControlLabel>
              <FormControl type="text"
                           placeholder={this.props.customers.editingCustomer === 0 ? 'Введите ФИО клиента' : this.props.customers.customerName}
                           className="col-xs-8"
                           onChange={this.changeInputCustomerValue} value={this.state.customerName}
                           name="customerName"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel className="col-xs-4">Паспорт:</ControlLabel>
              <FormControl type="text"
                           placeholder={this.props.customers.editingCustomer === 0 ? 'Введите номер паспорта клиента' : this.props.customers.customerPass}
                           className="col-xs-8"
                           onChange={this.changeInputCustomerValue} value={this.state.customerPass}
                           name="customerPass"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel className="col-xs-4">Адрес:</ControlLabel>
              <FormControl type="text"
                           placeholder={this.props.customers.editingCustomer === 0 ? 'Введите адрес клиента' : this.props.customers.customerAddress}
                           className="col-xs-8"
                           onChange={this.changeInputCustomerValue} value={this.state.customerAddress}
                           name="customerAddress"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel className="col-xs-4">Телефон:</ControlLabel>
              <FormControl type="phone" className="col-xs-8"
                           placeholder={this.props.customers.editingCustomer === 0 ? 'Введите телефон клиента' : this.props.customers.customerPhone}
                           onChange={this.changeInputCustomerValue} value={this.state.customerPhone}
                           name="customerPhone"/>
            </FormGroup>
            <div>
            </div>
          </Form>
          <Modal.Footer>
            <Button bsStyle="info" className="btn" onClick={this.cancelEditing}>Отмена</Button>
            <Button bsStyle="info" className="btn"
                    onClick={this.props.customers.editingCustomer === 0 ? this.addNewCustomer() : this.finishEditCustomer(this.props.customers.editingCustomer)}
                    disabled={this.state.customerName === '' || this.state.customerAddress === ''}>Добавить клиента</Button>
          </Modal.Footer>
        </Modal>
      </div>


    );
  }
}

const mapStateToProps = store => {
  return {
    customers: store.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actChangeInputCustomerValue: payload => dispatch(actChangeInputCustomerValue(payload)),
    actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),
    actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
    actCustomerModalHide: payload => dispatch(actCustomerModalHide(payload)),
    fetchPutCustomers: payload => dispatch(fetchPutCustomers(payload)),
    fetchEditCustomers: payload => dispatch(fetchEditCustomers(payload))

  };

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCustomer);

