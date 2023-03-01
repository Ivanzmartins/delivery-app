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
  if (!localStorageItems.length) {
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
    const removeItem = localStorageItems.filter((e) => e.id !== item.id);
    localStorageSaveItem('carrinho', removeItem);
  }
};
