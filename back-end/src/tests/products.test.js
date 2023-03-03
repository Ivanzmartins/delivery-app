const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { Product } = require('../database/models');
const productsList = require('./mocks/productsMock');


const { expect } = chai;
chai.use(chaiHttp);

describe('Teste da rota /products', () => {
  describe('GET', () => {

    before(async () => {})
    after(()=>{
      sinon.restore();
    })

    it('Os produtos devem ser retornardos', async () => {
      sinon.stub(Product, "findAll").resolves(productsList)
      const response = await chai.request(app).get('/products').send();

      expect(response.status).to.equal(200);
    })

    it('Um produto deve ser retornado', async () => {
      sinon.stub(Product, 'findOne').resolves(productsList[0]);
      const response = await chai.request(app).get('/products/1').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(productsList[0]);
    })
  });
});