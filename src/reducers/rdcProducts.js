import * as act from './actions'; // CONSTANTS FROM ACTIONS


const productState = {
  /* products */
  products: [],
  productName: '',
  productPrice: '',
  productDeposit: '',
  productPayment: '',
  productCategory: '',
  productDescription: '',
  products2: [],
  productModalShow: false,
  editingProduct: 0
};

export default function rdcProducts(state = productState, action) {

  const productsCopy = [...state.products];
  switch (action.type) {
    case act.PRODUCT_MODAL_SHOW:
      return { ...state, productModalShow: true };
    case act.PRODUCT_MODAL_HIDE:
      return { ...state, productModalShow: false };
    case act.FETCH_PRODUCTS_SUCCESSFUL:
      console.log(action.payload, '----action.payload');
      return {
        ...state,
        products: action.payload
      };
    case act.CHANGE_INPUT_PRODUCT_VALUE:
      const value = action.payload.target.value;
      const name = action.payload.target.name;
      return { ...state, [name]: value };
    case act.FETCH_DELETE_PRODUCTS_SUCCESSFUL:
      console.log('FETCH_DELETE_PRODUCTS_SUCCESSFUL action.payload.id', action.payload.id);
      const idForDelete = action.payload.id;
      const updatedProducts = productsCopy.filter(item => item.id !== idForDelete);
      console.log('updatedProducts', updatedProducts);
      return {
        ...state,
        products: updatedProducts
      };
    case act.FETCH_PUT_PRODUCTS_SUCCESSFUL:
      const newProducts = [...productsCopy, action.payload];
      return {
        ...state,
        products: newProducts,
        productName: '',
        productPrice: '',
        productDeposit: '',
        productPayment: '',
        productCategory: '',
        productDescription: '',
        productModalShow: false
      };

    case act.START_EDITING_PRODUCT:
      const idForEdit = action.payload;
      const productToEdit = productsCopy.find(item => item.id === idForEdit);
      return {
        ...state,
        productModalShow: true,
        productName: productToEdit.name,
        productPrice: productToEdit.price,
        productDeposit: productToEdit.deposit,
        productPayment: productToEdit.payment,
        productCategory: productToEdit.category,
        productDescription: productToEdit.description,
        editingProduct: idForEdit
      };
    case act.FETCH_EDIT_PRODUCTS_SUCCESSFUL:
      console.log('FETCH_EDIT_PRODUCTS_SUCCESSFUL act payload', action.payload);
      const toEditProduct = productsCopy.find(item => item.id === action.payload.id);
      toEditProduct.name = action.payload.name;
      toEditProduct.price = action.payload.price;
      return {
        ...state,
        products: productsCopy,
        productModalShow: false,
        productName: '',
        productPrice: '',
        productDeposit: '',
        productPayment: '',
        productCategory: '',
        productDescription: '',
        editingProduct: 0
      };
    default:

      return state;
  }
}
