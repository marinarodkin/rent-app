import * as act from './actions'; // CONSTANTS FROM ACTIONS

const customerState = {
  /* customers */
  customers: [],
  customerName: '',
  customerPass: '',
  customerAddress: '',
  customerPhone: '',
  customerModalShow: false,
  editingCustomer: 0,
  customerToEdit: {},
  customerArr: []
};

export default function rdcCustomers(state = customerState, action) {
  const customersCopy = [...state.customers];
  switch (action.type) {
    case act.CHANGE_INPUT_CUSTOMER_VALUE:
      const { value = '', name = '' } = action.payload ? action.payload.target : {};
      return { ...state, [name]: value };
    case act.CUSTOMER_MODAL_SHOW:
      return { ...state, customerModalShow: true };
    case act.CUSTOMER_MODAL_HIDE:
      return {
        ...state,
        customerModalShow: false,
        customerName: '',
        customerPass: '',
        customerAddress: '',
        customerPhone: '',
        customerToEdit: {},
        editingCustomer: 0};
    case act.FETCH_CUSTOMERS_SUCCESSFUL:
      return {
        ...state,
        customers: action.payload
      };
    case act.FETCH_DELETE_CUSTOMERS_SUCCESSFUL:
      const idForDelete = action.payload.id;
      const updatedCustomers = customersCopy.filter(item => item.id != idForDelete);
      return {
        ...state,
        customers: updatedCustomers
      };
    case act.FETCH_PUT_CUSTOMERS_SUCCESSFUL:
      const newCustomers = [...customersCopy, action.payload];
      return {
        ...state,
        customers: newCustomers,
        customerName: '',
        customerPass: '',
        customerAddress: '',
        customerPhone: '',
        customerModalShow: false
      };
    case act.START_EDITING_CUSTOMER:
      const idForEdit = action.payload;
      const customerToEdit = customersCopy.find(item => item.id === idForEdit);
      return {
        ...state,
        customerModalShow: true,
        customerName: customerToEdit.name,
        customerPass: customerToEdit.pass,
        customerAddress: customerToEdit.address,
        customerPhone: customerToEdit.phone,
        customerToEdit: customerToEdit,
        editingCustomer: idForEdit
      };
    case act.FETCH_EDIT_CUSTOMERS_SUCCESSFUL:
      const toEditCustomer = customersCopy.find(item => item.id === action.payload.id);
      toEditCustomer.name = action.payload.name;
      toEditCustomer.pass = action.payload.pass;
      toEditCustomer.address = action.payload.address;
      toEditCustomer.phone = action.payload.phone;
      return {
        ...state,
        customers: customersCopy,
        customerModalShow: false,
        customerName: '',
        customerPass: '',
        customerAddress: '',
        customerPhone: '',
        editingCustomer: 0
      };

    default:
      return state;
  }
}
