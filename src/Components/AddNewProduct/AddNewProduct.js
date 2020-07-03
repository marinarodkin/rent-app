import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Form, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    actChangeInputProductValue,
    actAddNewProduct,
    actProductModalShow,
    actProductModalHide,
    fetchEditProducts,
    fetchPutProducts,
} from "../../reducers/actions_creators";
import './styles.css'

class AddNewProduct extends Component {
//TODO: add prop.types
    finishEditProduct = (id, product) => (event) => {
        console.log('finishEditProduct product', product)
        event.preventDefault(event);
        this.props.fetchEditProducts({id, product})
    }
    addNewProduct = (product) => (event) => {
        console.log('addNewProduct product', product)
        event.preventDefault(event);
        this.props.fetchPutProducts(product)
    }

    render() {
        const newProduct = {
            name: this.props.products.productName,
            price: this.props.products.productPrice,
            deposit: this.props.products.productDeposit,
             payment: this.props.products.productPayment,
            category: this.props.products.productCategory,
            description: this.props.products.productDescription,
        }
        return (
            <div className="static-modal add-customer-modal">
                <Modal show={this.props.products.productModalShow} onHide={this.props.actProductModalHide}>
                    <Modal.Header>
                        <Modal.Title>Добавить новый инструмент</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Form className="add-form">
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Название инструмента</ControlLabel>
                            <FormControl type="text" placeholder="Добавьте название" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productName} name="productName"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Цена Инструмента</ControlLabel>
                            <FormControl type="text" placeholder="Добавьте цену" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productPrice} name="productPrice"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Залог</ControlLabel>
                            <FormControl type="text" placeholder="Залог" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productDeposit} name="productDeposit"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Оплата за сутки</ControlLabel>
                            <FormControl type="text" placeholder="Оплата за сутки" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productPayment} name="productPayment"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Категория Инструмента</ControlLabel>
                            <FormControl type="text" placeholder="Категория Инструмента" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productCategory} name="productCategory"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-xs-4">Описание Инструмента</ControlLabel>
                            <FormControl type="text" placeholder="Описание Инструмента" className="col-xs-8"
                                         onChange={this.props.actChangeInputProductValue}
                                         value={this.props.products.productDescription} name="productDescription"/>
                        </FormGroup>
                    </Form>
                    <Modal.Footer>
                        <Button bsStyle="info" className="btn" onClick={this.props.actProductModalHide}>Отменить</Button>
                        <Button bsStyle="info" className="btn" onClick={this.props.products.editingProduct === 0 ? this.addNewProduct(newProduct) : this.finishEditProduct(this.props.products.editingProduct, newProduct)}
                                disabled={this.props.products.productName === "" || this.props.products.productPrice === ""}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = store => {
  return {
      products: store.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      actChangeInputProductValue: payload => dispatch(actChangeInputProductValue(payload)),
      actAddNewProduct: payload => dispatch(actAddNewProduct(payload)),
      actProductModalShow: payload => dispatch(actProductModalShow(payload)),
      actProductModalHide: payload => dispatch(actProductModalHide(payload)),
      fetchEditProducts: payload => dispatch(fetchEditProducts(payload)),
      fetchPutProducts: payload => dispatch(fetchPutProducts(payload)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewProduct)


