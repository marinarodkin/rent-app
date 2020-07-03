

export  function getItemPrice (id, products) {
    const result = products.find(item => item.name == id);
    return result.price
}
