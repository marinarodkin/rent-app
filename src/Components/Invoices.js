import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import {connect} from 'react-redux'
import {
    actSetAddNewActive,
    actStartEditing,
    fetchInvoices, fetchDeleteInvoices, fetchInvoiceDetails,
    fetchCustomers,
    fetchProducts,
    actInvoiceModalShow,
    actCustomerModalShow,
} from './../reducers/actions_creators';

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvoiceMenu: true
        }
    }

    componentDidMount() {
        this.props.fetchInvoices();
        this.props.fetchCustomers();
        this.props.fetchProducts();
    }

    deleteInvoice = id => event => {
        event.preventDefault(event);
        this.props.fetchDeleteInvoices(id)
    };

    startEditInvoice = id => event => {
        event.preventDefault(event);
        this.props.fetchInvoiceDetails(id);
        this.props.actStartEditing({id});
    };

    render() {
        const {invoices, isAddingInvoice} = this.props.invoices;
        const {actSetAddNewActive} = this.props;
        const {isMenu} = this.props;

        return (
            <div className="" style={{marginTop: '20px'}}>
                {isMenu ?
                    <div className="top-line top-line-inv">
                        <div className=" title">Активные заказы</div>
                        <Button
                        className="col-xs-3 pull-right"
                        bsStyle="info"
                        onClick={this.props.actInvoiceModalShow}
                    >
                        Добавить заказ
                    </Button>
                        <Button
                            className="col-xs-3 pull-right"
                            bsStyle="info"
                            onClick={this.props.actCustomerModalShow}
                        >
                            Добавить клиента
                        </Button>
                    </div>
                    :
                    <div className="top-line top-line-inv">
                        <div className=" title">История заказов</div>
                    </div>
                }

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th className="col-xs-1 text-center">#</th>
                        <th className="col-xs-4 text-center">Клиент</th>
                        <th className="col-xs-4 text-center">Инструмент</th>
                        <th className="col-xs-1 text-center">Залог</th>
                        <th className="col-xs-1 text-center">Дней</th>
                        <th className="col-xs-1 text-center">Стоимость</th>
                        <th className="col-xs-1 text-center">Итого</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map(item => (
                        <tr key={item.id}>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.customer}</td>
                            <td className="text-center">{item.product}</td>
                            <td className="text-center">{item.deposit}</td>
                            <td className="text-center">{item.days} </td>
                            <td className="text-center">{item.payment}</td>
                            <td className="text-center">{item.total}</td>
                            <td className="col-xs-1 border-none">
                                <Button className="table-button table-button--first" bsStyle="info"
                                        onClick={this.startEditInvoice(item.id)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </td>
                            <td className="col-xs-1 border-none">
                                <Button className="table-button" bsStyle="info" onClick={this.deleteInvoice(item.id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                            {isMenu &&
                            <td className="col-xs-1 border-none">
                                <Button className="table-button table-button--check" bsStyle="info"
                                        onClick={this.deleteInvoice(item.id)}>
                                    <i className="fas  fa-check"></i>
                                </Button>
                            </td>
                            }

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
        invoices: store.invoices,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actSetAddNewActive: payload => dispatch(actSetAddNewActive(payload)),
        actStartEditing: payload => dispatch(actStartEditing(payload)),
        fetchInvoices: payload => dispatch(fetchInvoices(payload)),
        fetchDeleteInvoices: payload => dispatch(fetchDeleteInvoices(payload)),
        fetchInvoiceDetails: payload => dispatch(fetchInvoiceDetails(payload)),
        fetchCustomers: payload => dispatch(fetchCustomers(payload)),
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        actInvoiceModalShow: payload => dispatch(actInvoiceModalShow(payload)),
        actCustomerModalShow: payload => dispatch(actCustomerModalShow(payload)),
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoices)


