const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const { mockUser } = require('./mocks/userMock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Teste da rota /login', () => {
  describe('POST', () => {

    beforeEach(async () => {
     /*  sinon.stub(User, "findOne")
			.onCall(0).resolves(mockUser)
			.onCall(1).resolves(null); */
    })
    afterEach(()=>{
      sinon.restore();
    })

    it('Usuário deve conseguir fazer o login com email e senha válida e já cadastrada', async () => {
      sinon.stub(User, "findOne")
			.resolves({ dataValues: mockUser, ...mockUser })
      const response = await chai.request(app).post('/login')
        .send({ email: mockUser.email , password: 'fulana@123' });

      expect(response.status).to.equal(200);
    });

    it('Usuário não deve conseguir fazer o login com email incorreto', async () => {
      sinon.stub(User, "findOne")
			.resolves(null)
      const response = await chai.request(app).post('/login')
        .send({ email: 'faketest@test.com', password: 'teste123' });

      expect(response.status).to.equal(404);
    });

    it('Usuário não deve conseguir fazer o login com senha incorreta', async () => {
      sinon.stub(User, "findOne")
			.resolves({ dataValues: mockUser, ...mockUser })
      const response = await chai.request(app).post('/login')
        .send({ email: mockUser.email, password: 'teste321' });

      expect(response.status).to.equal(401);
    });
  });
});