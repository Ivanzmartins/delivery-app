export const localStorageSaveItem = (key, value) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key) => {
  const checkStorage = localStorage.getItem(key);
  if (!checkStorage && key === 'carrinho') localStorageSaveItem(key, []);
  return JSON.parse(localStorage.getItem(key));
};

export const addLocalStorageCartItem = (item) => {
  const localStorageItems = getLocalStorageItem('carrinho');
  const isThereOneInStorage = localStorageItems
    .some((e) => e.productId === item.productId);
  if (!localStorageItems.length) {
    localStorageSaveItem('carrinho', [item]);
  } else if (isThereOneInStorage) {
    console.log('AQUI');
    const newItems = localStorageItems
      .map((e) => (e.productId === item.productId
        ? { ...e, quantity: item.quantity, subTotal: item.subTotal }
        : e));
    localStorageSaveItem('carrinho', newItems);
  } else {
    localStorageSaveItem('carrinho', [...localStorageItems, item]);
  }
};

// export const rmLocalStorageCartItem = (item) => {
//   const localStorageItems = getLocalStorageItem('carrinho');
//   if (!localStorageItems) {
//     localStorageSaveItem('carrinho', []);
//   } else {
//     const itemIndex = localStorageItems.findIndex((e) => e.id === item.id);
//     delete localStorageItems[itemIndex];
//     const newItems = localStorageItems.filter((e) => e !== null);
//     localStorageSaveItem('carrinho', newItems);
//   }
// };

export const rmLocalStorageCartItem = (item) => {
  const localStorageItems = getLocalStorageItem('carrinho');
  if (!localStorageItems) {
    localStorageSaveItem('carrinho', []);
  } else {
    const removeItem = localStorageItems.filter((e) => e.id !== item.id);
    localStorageSaveItem('carrinho', removeItem);
  }
};
