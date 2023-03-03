const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const { mockSeller } = require('./mocks/userMock');


const { expect } = chai;
chai.use(chaiHttp);

describe('Teste da rota /products', () => {
  describe('GET', () => {

    before(async () => {})
    after(()=>{
      sinon.restore();
    })

    it('Os produtos devem ser retornados', async () => {
      sinon.stub(User, "findAll").resolves(mockSeller)
      const response = await chai.request(app).get('/user/sellers').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal(mockSeller);
    })
  });
});