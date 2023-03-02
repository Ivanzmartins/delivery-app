import React, { useEffect, useState } from 'react';

export default function AdressForm() {
  const [adress, setAdress] = useState('');
  const [adressNumber, setAdressNumber] = ('');
  const [sellers, setSellers] = ([]);

  useEffect(() => {
    const getSellers = async () => {
      try {
        const sllrs = await apiGetAll('/users/sellers');
        setSellers(sllrs);
      } catch (error) {
        console.log(error);
      }
    };
    getSellers();
  }, []);

  // const finish = async () => {
  //   const cart = getLocalStorageItem('carrinho');
  // };

  return (

    <>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <form>
          <label htmlFor="select">
            P. Vendedora Resposável:
            <select data-testid="customer_checkout__select-seller">
              {sellers.map((s, index) => <option key={ index }>{s.name}</option>)}
            </select>
          </label>
          <label htmlFor="adress">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              value={ adress }
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              onChange={ ({ target: { value } }) => setAdress(value) }
            />
          </label>
          <label htmlFor="adress-number">
            Número
            <input
              data-testid="customer_checkout__input-address-number"
              type="text"
              value={ adressNumber }
              placeholder="198"
              onChange={ ({ target: { value } }) => setAdressNumber(value) }
            />
          </label>
        </form>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );
}
