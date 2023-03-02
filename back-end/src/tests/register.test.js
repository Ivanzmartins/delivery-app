const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const { mockRegister, newRegister, mockNewRegister } = require('./mocks/userMock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Teste da rota /register', () => {
  describe('POST', () => {

    before(async () => {
      sinon.stub(User, "create").resolves(({ dataValues: mockNewRegister, ...mockNewRegister }))
    })
    after(()=>{
      sinon.restore();
    })

    it('Quando usuário se cadastrar será gerado um token', async () => {
      const response = await chai.request(app).post('/register')
        .send({...newRegister, password: 'tonho123'});

      expect(response.status).to.equal(201);
    });

    it('Usuário fica impossibilitado de criar novo cadastro com e-mail e senha já presentes no banco de dados', async () => {
      const response = await chai.request(app).post('/register')
        .send(mockRegister)

      expect(response.status).to.equal(409);
    });
  });
});