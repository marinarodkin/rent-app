/*
Resources

Customers
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}

Products
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}

Invoices
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}

InvoiceItems
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
*/
import axios from 'axios';

async function getJSON(){
    let json = await axios.get('/api/customers');
    return json;
}

export default getJSON
