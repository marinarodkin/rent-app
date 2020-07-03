import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
  actChangeInputValue,
  actCancelNewInvoices,
  fetchPutInvoices,
  fetchPutInvoiceDetails,
  fetchEditInvoices,
  fetchEditInvoiceDetails,
  fetchDeleteInvoiceDetails,
 } from '../../reducers/actions_creators';
import './styles.css';
import { getItemPrice } from '../../functions';
import PropTypes from 'prop-types';

class AddNewInvoice11 extends Component {
  //TODO: ??? how to make propTypes
  /*
  static propTypes = {
    products: PropTypes.object,
    fetchPutInvoices: PropTypes.func,
  };
  */

  state = {
    newCustomer: '',
    newDiscount: 0,
    newTotal: 0,
    newSubTotal: 0,
    invoiceDetails: [],
    newProduct: '',
    editingInvoice: 0,
    prevInvoiceDetails: [],
  };

  componentWillReceiveProps(nextProps) {
    // for editing invoice and invoice details
    const { invoiceDetails, editInvoiceId } = nextProps.invoiceItems;
    const { newCustomer, newDiscount, editingInvoice, newTotal } = nextProps.invoices;
    const prevInvoiceDetails = [...invoiceDetails];  // make copy to compare before sending new data to server
    if (editInvoiceId !== 0) {
      const mapInvoiceDetails = invoiceDetails.map((item) => {
        return {
          name: item.product_id,
          quantity: item.quantity,
          price: getItemPrice(item.product_id, this.props.products.products),
          id: item.id,
        };
      });
      const discount = newDiscount !== 0 ? (100 - newDiscount) / 100 : 1;
      const newSubTotal = (newTotal / discount).toFixed(2);
      this.setState(prevState => ({ ...prevState,
        invoiceDetails: mapInvoiceDetails,
        prevInvoiceDetails,
        newCustomer,
        newDiscount,
        editingInvoice,
        newSubTotal,
        newTotal,
      }));
    }
  }

  changeInputValue = ({ target: { value, name } }) => {
    const reg = /^\d+$/;
    if (name === 'newDiscount' && (value > 100 || value < 0 || !value.match(reg))) {
      return;
    }
    this.setState({
      [name]: value,
    });
  };

  addProductInInvoice = ({ target: { value, name } }) => {
    if (value === '') return;
    const newProduct = value;
    const stateCopy = {...this.state};
    //const { newProduct, invoiceDetails } = stateCopy;
    const {invoiceDetails } = stateCopy;
    let newInvoiceItem = {};
    const itemInInvoiceToChange = invoiceDetails.find(item => item.name === newProduct); // checking if this item is already in invoice products table
    if (itemInInvoiceToChange) {
      // when this item is already in table
      itemInInvoiceToChange.quantity = itemInInvoiceToChange.quantity * 1 + 1;
    } else {
      // when this item is the first time selected
      newInvoiceItem = {
        name: newProduct,
        quantity: 1,
        price: getItemPrice(newProduct, this.props.products.products),
      };
    }
    const newInvoiceDetails = itemInInvoiceToChange ? invoiceDetails : [...invoiceDetails, newInvoiceItem];
    const newSubTotal = (newInvoiceDetails.reduce((sum, item) => {
      return sum + item.price * item.quantity }, 0)).toFixed(2);
    this.setState(prevState => ({ ...prevState, invoiceDetails: newInvoiceDetails, newProductTotal: 0, newSubTotal, newProduct }));
  }


  changeProductQuantity = (event) => {
    event.preventDefault(event);
    const {name, value} = event.target;
    console.log('value', value);
    const reg = /^\d+$/;
    console.log('value.match(reg)', value.match(reg));
    if (!value.match(reg)) return;
    if (value == 0) {
      console.log('delete');
      this.deleteItemFromList(name);
    } else {
      const stateCopy = { ...this.state };
      const { invoiceDetails } = stateCopy;
      const productToChange = invoiceDetails.find(item => item.name === name);
      productToChange.quantity = value;
      productToChange.total = value * productToChange.price;
      const newSubTotal = (invoiceDetails.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)).toFixed(2);
      this.setState(prevState => ({ ...prevState, invoiceDetails, newSubTotal }));
    }
  }

  deleteItem = name => (event) => {
    event.preventDefault(event);
    this.deleteItemFromList(name);

  }

  deleteItemFromList = (name) => {
    const newInvoiceDetails = this.state.invoiceDetails.filter(item => item.name !== name);
    const newSubTotal = (newInvoiceDetails.reduce((sum, item) => {
      return sum + item.price * item.quantity }, 0)).toFixed(2);
    this.setState(prevState => ({...prevState, invoiceDetails: newInvoiceDetails, newSubTotal}));
  }

  addNewInvoice = (productsInInvoice, total) => (event) => {
    event.preventDefault(event);
    const {newCustomer, newDiscount} = this.state;
    this.props.fetchPutInvoices({newCustomer, newDiscount, total  });
    const id = this.props.invoices.currentInvoiceId;
    productsInInvoice.forEach(item =>
      this.props.fetchPutInvoiceDetails({id, item }) )
    this.setState(prevState => ({...prevState }));
  }

  finishEditInvoice = (total) => (event) => {
    event.preventDefault(event);
    const {newCustomer, newDiscount, editingInvoice, invoiceDetails, prevInvoiceDetails} = this.state;
    //const id = editingInvoice;
    this.props.fetchEditInvoices({newCustomer, newDiscount, total, id: editingInvoice }); //new invoice to server
    //invoice details to server
    invoiceDetails.forEach(item => {
      if (prevInvoiceDetails.findIndex(elem => elem.product_id === item.name) === -1){
        this.props.fetchPutInvoiceDetails({id: editingInvoice, item })  // items that were added as new
      } else {
        const prevItem = prevInvoiceDetails.find(elem => elem.product_id === item.name);
        console.log('prevItem', prevItem, 'item', item)
        if (item.quantity === prevItem.quantity) {
          return;
        }
          else {
            this.props.fetchEditInvoiceDetails({ id: editingInvoice, item })
           } // items that were changed
         }
         } )
    prevInvoiceDetails.forEach(item => {
      if (invoiceDetails.findIndex(elem => elem.name === item.product_id) === -1){
        this.props.fetchDeleteInvoiceDetails({ id: editingInvoice, item }) // items that were deleted
      }
      }
    )
  }

  render() {
    console.log('start');
    const { customers } = this.props.customers;
    const { products } = this.props.products;
    const productsInInvoice = this.state.invoiceDetails || [];
    const discount = this.state.newDiscount !== 0 ? (100 - this.state.newDiscount) / 100 : 1;
    const newTotal = (this.state.newSubTotal * discount).toFixed(2);

    return (
      <div className="addNew">
        <h4>Добавить новый заказ</h4>
        <hr/>
        <div className='form-group'>
              <label htmlFor='customer_id' className='form-label'>Клиент</label>
              <select className='form-control form-select'
              id='customer_id'
              value={this.state.newCustomer}
              onChange={this.changeInputValue}
              name="newCustomer"
              >
              <option hidden={true} value= ''>
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
          <label htmlFor='product_id' className='form-label'>Инструмент</label>
          <select className='form-control form-select' id='product_id'
            value={this.state.newProduct}
            onChange={this.addProductInInvoice}
            name="newProduct"
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
        {productsInInvoice.length < 1 ?
            (< div className="cancel-total col-md-offset-10 col-md-2 text-right">
              <hr/>
              <Button bsStyle="info" className="btn" onClick={this.props.actCancelNewInvoices}>Отменить</Button>
            </div>)
            :
            <div className="invoice-items-table">
              <Table striped condensed hover>
                <thead>
                <tr>
                  <th className="col-xs-1 text-center">#</th>
                  <th className="col-xs-4">Product</th>
                  <th className="col-xs-1 text-center">Price</th>
                  <th className="col-xs-1 text-center">Quantity</th>
                  <th className="col-xs-1 text-center">Total</th>
                  <th className="col-xs-1 text-center"></th>
                </tr>
                </thead>
                <tbody>
                {productsInInvoice.map((item, index) => (
                    <tr key={`p-${item.name}`}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">
                        <input className="quantity-input" type="number" placeholder="0"
                               onChange={this.changeProductQuantity}
                               value={item.quantity} name={item.name}/>
                      </td>
                      <th className="col-xs-1 text-center">{(item.quantity * item.price).toFixed(2)}</th>
                      <td className="text-center">
                        <Button className="" bsStyle="info" onClick={this.deleteItem(item.name)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </Table>
             <hr/>j
              < div className="invoice-total">
                <div className="total-title">Subtotal: <span
                    className="total-sum">{this.state.newSubTotal}</span></div>
                <div className="discount-block">
                  <label htmlFor="discount-input" className="text-left">Discount:</label>
                  <input className="discount-input" type="number" placeholder={this.state.newDiscount}
                         onChange={this.changeInputValue}
                         value={this.state.newDiscount} name="newDiscount"/>
                </div>
                <hr/>
                <div className="total-title">Total: <span
                    className="total-sum">{newTotal}</span></div>
                <div className="add-btns">
                  <Button bsStyle="info" className="btn btn-cancel"
                          onClick={this.props.actCancelNewInvoices}>Cancel</Button>
                  <Button bsStyle="info" className="btn"
                          onClick={this.state.editingInvoice != 0 ? this.finishEditInvoice(newTotal) : this.addNewInvoice(productsInInvoice, newTotal )}
                          disabled={this.state.newCustomer === "" || productsInInvoice.length < 1}>Save Invoice</Button>
                </div>
              </div>
            </div>
        }
        <hr/>
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    customers: store.customers,
    products: store.products,
    invoices: store.invoices,
    invoiceItems: store.invoiceItems
  };
}

const mapDispatchToProps = dispatch => {
  return {
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
)(AddNewInvoice11)
