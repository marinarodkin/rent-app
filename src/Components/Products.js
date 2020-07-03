import React, { Component } from 'react';
import {  Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import {actSetAddNewActive} from "./../reducers/actions_creators.js"
import {
    actDeleteProduct,
    actStartEditingProduct,
    actProductModalShow,
    fetchProducts,
    fetchDeleteProducts
} from "./../reducers/actions_creators";
import './styles.css'


class Products extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    deleteProduct = (id) => (event) => {
        event.preventDefault(event);
        this.props.fetchDeleteProducts(id)
    }
    startEditProduct = (id) => (event) => {
        event.preventDefault(event);
        this.props.actStartEditingProduct(id)
    }

    render() {

        const products = this.props.products.products;
        return (
            <div className = "products" >

                <div className= "top-line top-line-inv">
                    <div className = " title">Инструменты</div>
                    <Button className="col-xs-3 pull-right" bsStyle="info" onClick={this.props.actProductModalShow}>Добавить Инструмент</Button>
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th className="col-xs-1 text-center">#</th>
                        <th className="col-xs-3 text-center">Наименование</th>
                        <th className="col-xs-1 text-center">Цена</th>
                        <th className="col-xs-1 text-center">Залог</th>
                        <th className="col-xs-1 text-center">За сутки</th>
                        <th className="col-xs-3 text-center">Категория</th>
                        <th className="col-xs-3 text-center">Описание</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(item => (
                        <tr key = {item.id}>
                            <td  className ="text-center">{item.id}</td>
                            <td className ="text-center">{item.name}</td>
                            <td className="text-center">{item.price}</td>
                            <td className="text-center">{item.deposit}</td>
                            <td className="text-center">{item.payment}</td>
                            <td className="text-center">{item.category}</td>
                            <td className="text-center">{item.description}</td>
                            <td className="col-xs-1 border-none" ><Button className="table-button table-button--first" bsStyle="info" onClick={this.startEditProduct(item.id)} ><i className="fas fa-edit"></i></Button></td>
                            <td className="col-xs-1 border-none" ><Button className="table-button" bsStyle="info" onClick={this.deleteProduct(item.id)} ><i className="fas fa-trash"></i></Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>;
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
        actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
        actDeleteProduct: payload => dispatch(actDeleteProduct(payload)),
        actStartEditingProduct: payload => dispatch(actStartEditingProduct(payload)),
        actProductModalShow: payload => dispatch(actProductModalShow(payload)),
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        fetchDeleteProducts: payload => dispatch(fetchDeleteProducts(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products)
