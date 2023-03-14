import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../services/localStorage';
import { apiGetAll, apiPost } from '../services/requests';

import '../styles/adressForm.css';

export default function AddressForm() {
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState('');
  const navigate = useNavigate();

  const getTotal = () => {
    const cart = getLocalStorageItem('carrinho');
    const sum = cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    return sum.toFixed(2);
  };

  useEffect(() => {
    const getSellers = async () => {
      try {
        const sllrs = await apiGetAll('/user/sellers');
        setSellers(sllrs);
        setSeller(sllrs[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    getSellers();
  }, []);

  const getProductsInfo = () => {
    const cart = getLocalStorageItem('carrinho');
    return cart.map((p) => ({ id: p.productId, quantity: p.quantity }));
  };

  const finish = async () => {
    const body = {
      saleInfos: {
        sellerId: seller,
        totalPrice: getTotal(),
        deliveryAddress: address,
        deliveryNumber: addressNumber,
      },
      products: getProductsInfo(),
    };
    try {
      const { id } = await apiPost('/customer/checkout', body);
      localStorage.removeItem('carrinho');
      navigate(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <main className="container">
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <form>
          <label htmlFor="select">
            P. Vendedora Responsável:
            <select
              data-testid="customer_checkout__select-seller"
              value={ seller }
              onChange={ ({ target: { value } }) => setSeller(value) }
            >
              {sellers.map((s, index) => (
                <option
                  key={ index }
                  value={ s.id }
                >
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="adress">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              value={ address }
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              onChange={ ({ target: { value } }) => setAddress(value) }
            />
          </label>
          <label htmlFor="adress-number">
            Número
            <input
              data-testid="customer_checkout__input-address-number"
              type="text"
              value={ addressNumber }
              placeholder="198"
              onChange={ ({ target: { value } }) => setAddressNumber(value) }
            />
          </label>
        </form>
        <button
          className="finalizar-pedido-button"
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => finish() }
        >
          Finalizar Pedido
        </button>
      </div>
    </main>
  );
}
