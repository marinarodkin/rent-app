import { combineReducers } from 'redux';
import * as act from './actions'; // CONSTANTS FROM ACTIONS

import { getItemPrice, getCustomerId } from '../functions';


const invoiceDetailsState = {
  /*invoiceItems*/
  invoiceDetails: [],
  editInvoiceId: 0,
  }

export default function rdcInvoiceDetails(state = invoiceDetailsState, action) {

  switch (action.type) {

    case act.FETCH_INVOICEDETAILS_SUCCESSFUL:
      console.log('act.FETCH_INVOICEDETAILS_SUCCESSFUL', action.payload);
      return {
        ...state,
        invoiceDetails: action.payload.items,
        editInvoiceId: action.payload.id,
      };

    default:
      return state
}
}

