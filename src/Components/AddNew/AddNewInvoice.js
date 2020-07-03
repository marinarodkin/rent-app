import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    actChangeInputValue,
    actAddNewInvoice,
    actInvoiceModalShow,
    actInvoiceModalHide,
    fetchEditInvoices,
    fetchPutInvoices,
    actCancelNewInvoices
} from "../../reducers/actions_creators";
import './styles.css'

class AddNewInvoice extends Component {

    state = {
        invoiceId: '',
        customer: '',
        product: '',
        days: '',
        deposit: '',
        payment: '',
        total: '',
    };

    finishEditProduct = (id, product) => (event) => {
        console.log('finishEditProduct product', product)
        event.preventDefault(event);
        this.props.fetchEditProducts({id, product})
    }


    changeInputValue = ({ target: { value, name } }) => {
        this.setState({
            [name]: value,
        });
        console.log("change value state", this.state);
    };

    addNewInvoice = () => (event) => {
        const { invoiceId, customer, product, days, deposit, payment } = this.state;
        event.preventDefault(event);
        const { products } = this.props.products;
        const currentProduct = products.find(item => item.name === product)
        const newInvoice = {
            id: invoiceId,
            customer,
            product,
            days,
            deposit: currentProduct.deposit,
            payment: currentProduct.payment,
            total: currentProduct.payment * days
        };
        this.setState({
            invoiceId: '',
            customer: '',
            product: '',
            days: '',
            deposit: '',
            payment: '',
            total: ''
        });
        console.log('newInvoice', newInvoice);
        this.props.fetchPutInvoices(newInvoice);
        this.props.actInvoiceModalHide();
    };

    cancelEditing = () => {
        this.setState({
            invoiceId: '',
            customer: '',
            product: '',
            days: '',
            deposit: '',
            payment: '',
            total: ''
        });
        this.props.actInvoiceModalHide();
    };

    render() {
        const { customers } = this.props.customers;
        const { products } = this.props.products;

        return (
            <div className="static-modal add-innoice-modal">
                <Modal show={this.props.invoices.invoiceModalShow} onHide={this.props.actInvoiceModalHide}>
                    <Modal.Header>
                        <Modal.Title>Добавить новый заказ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='form-group'>
                            <label htmlFor='customer_id' className='form-label label-add-invoice'>Клиент</label>
                            <select className='form-control form-select select-add-invoice'
                                    id='customer_id'
                                    value={this.state.customer}
                                    onChange={this.changeInputValue}
                                    name="customer"
                            >
                                <option hidden={false} value= ''>
                                    Выбрать клиента
                                </option>
                                {customers.map(customer =>
                                    <option key={customer.id} value={customer.name}>
                                        {customer.name}
                                    </option>
                                )})}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='product_id' className='form-label label-add-invoice'>Инструмент</label>
                            <select className='form-control form-select select-add-invoice' id='product_id'
                                    value={this.state.product}
                                    onChange={this.changeInputValue}
                                    name="product"
                            >
                                <option hidden={false} value = '' >
                                    Выбрать Инструмент
                                </option>
                                {products.map(product =>
                                    <option key={product.id} value={product.name}>
                                        {product.name}
                                    </option>
                                )})}
                            </select>

                        </div>
                        <FormGroup>
                            <ControlLabel className="label-add-invoice">Количество дней</ControlLabel>
                            <FormControl type="text" placeholder="Количество дней" className="input-add-invoice"
                                         onChange={this.changeInputValue}
                                         value={this.state.days} name="days"/>
                        </FormGroup>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.cancelEditing}>Отменить</Button>
                    <Button bsStyle="info" className="btn"
                            onClick={this.props.customers.editingCustomer === 0 ? this.addNewInvoice() : this.finishEditCustomer(this.props.invoices.editingInvoice)}
                            disabled={this.state.customer === '' || this.state.product === ''}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = store => {
  return {
      customers: store.customers,
      products: store.products,
      invoices: store.invoices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      actInvoiceModalShow: payload => dispatch(actInvoiceModalShow(payload)),
      actInvoiceModalHide: payload => dispatch(actInvoiceModalHide(payload)),
      actCancelNewInvoices: payload => dispatch(actCancelNewInvoices(payload)),
      actChangeInputValue: payload => dispatch(actChangeInputValue(payload)),
      fetchPutInvoices: payload => dispatch(fetchPutInvoices(payload)),
      fetchPutInvoiceDetails: payload => dispatch(fetchPutInvoiceDetails(payload)),
      fetchEditInvoices: payload => dispatch(fetchEditInvoices(payload)),
      fetchEditInvoiceDetails: payload => dispatch(fetchEditInvoiceDetails(payload)),
      fetchDeleteInvoiceDetails: payload => dispatch(fetchDeleteInvoiceDetails(payload)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewInvoice)


