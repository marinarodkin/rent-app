import * as act from './actions'; // CONSTANTS FROM ACTIONS

const invoiceState = {
  /* invoices */
  invoices: [],
  isAddingInvoice: false,
  newInvoice: {},
  newCustomer: '',
  newTotal: 0,
  newSubTotal: 0,
  newDiscount: 0,
  editingInvoice: 0,
  idForDetails: 0,
  invoiceToEdit: {},
  currentInvoiceId: 1,
  invoiceModalShow: false,
  invoiceMenu: false,
};

//TODO: ? нужно ли убрать все const из case (согласно требованиям WebStorm)

export default function rdcInvoices(state = invoiceState, action) {
  const invoiceCopy = [...state.invoices];
  const { id = 0 } = action.payload ? action.payload : {};
  switch (action.type) {
    case act.IS_INVOICE_MENU:
      return { ...state, invoiceMenu: true};
    case act.INVOICE_MODAL_SHOW:
      return { ...state, invoiceModalShow: true };
    case act.INVOICE_MODAL_HIDE:
      return { ...state, invoiceModalShow: false };
    case act.SET_ADDNEW_ACTIVE:
      return { ...state, isAddingInvoice: !state.isAddingInvoice};
    case act.CANCEL_NEW_INVOICE:
      return {
        ...state,
        isAddingInvoice: false,
        newCustomer: '',
        newDiscount: 0,
        newTotal: 0,
        newSubTotal: 0,
        invoiceItems: [],
      };
    case act.FETCH_INVOICES_SUCCESSFUL:
      return {
        ...state,
        invoices: action.payload,
      };
    case act.FETCH_PUT_INVOICES_SUCCESSFUL:
      console.log('act.FETCH_PUT_INVOICES_SUCCESSFUL:,action.payload', action.payload);
      const newInvoicesArr = [...invoiceCopy, action.payload];
      const newCurrentInvoiceId = action.payload.id + 1;
      return {
        ...state,
        isAddingInvoice: false,
        invoices: newInvoicesArr,
        idForDetails: action.payload.id,
        currentInvoiceId: newCurrentInvoiceId,
      };
    case act.FETCH_EDIT_INVOICES_SUCCESSFUL:
      const toEditInvoice = invoiceCopy.find(item => item.id === id);
      toEditInvoice.customer = action.payload.customer_id;
      toEditInvoice.discount = action.payload.discount;
      toEditInvoice.total = action.payload.total;
      return {
        ...state,
        isAddingInvoice: false,
        invoices: invoiceCopy,
        idForDetails: action.payload.id,
        newCustomer: '',
        newDiscount: 0,
        editingInvoice: 0
      };
    case act.FETCH_DELETE_INVOICES_SUCCESSFUL:
      const updatedInvoices = invoiceCopy.filter(item => item.id !== id);
      return {
        ...state,
        invoices: updatedInvoices
      };
    case act.START_EDITING:
      const invoicesToEdit = invoiceCopy.find(item => item.id === id);
      return {
        ...state,
        isAddingInvoice: true,
        newCustomer: invoicesToEdit.customer_id,
        newDiscount: invoicesToEdit.discount,
        editingInvoice: id,
        newTotal: invoicesToEdit.total,
      }
    default:
      return state;
  }
}
