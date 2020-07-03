import { combineReducers } from 'redux';
import rdcInvoices from './rdcInvoices';
import rdcInvoiceDetails from './rdcDetailsInvoice';
import rdcProducts from './rdcProducts';
import rdcCustomers from './rdcCustomers';

const rootReducer = combineReducers({
  invoices: rdcInvoices,
  customers: rdcCustomers,
  products: rdcProducts,
  invoiceItems: rdcInvoiceDetails,
});

export default rootReducer;

