export const localStorageSaveItem = (key, value) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key));

export const addLocalStorageCartItem = (item) => {
  const localStorageItems = getLocalStorageItem('carrinho');
  if (!localStorageItems) {
    localStorageSaveItem('carrinho', [item]);
  } else {
    localStorageSaveItem('carrinho', [...localStorageItems, item]);
  }
};

export const rmLocalStorageCartItem = (item) => {
  const localStorageItems = getLocalStorageItem('carrinho');
  if (!localStorageItems) {
    localStorageSaveItem('carrinho', []);
  } else {
    const itemIndex = localStorageItems.findIndex((e) => e.id === item.id);
    delete localStorageItems[itemIndex];
    const newItems = localStorageItems.filter((e) => e !== null);
    localStorageSaveItem('carrinho', newItems);
  }
};
