const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../app');
const { from } = require('form-data');

const transferService = require('../../service/transferService');

const { BadRequestError } = require('../../service/transferService');

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "re",
                    to: "fe",
                    value: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.');
            });

            it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
               
                const transferServiceMock = sinon.stub(transferService, 'transferValue');
                transferServiceMock.throws(new BadRequestError('Usuário remetente ou destinatário não encontrado.'));

                const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "re",
                    to: "fe",
                    value: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.');
            })

            it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.returns({ 
                transfer: {
                    from: "re", 
                    to: "fe", 
                    value: 100, 
                    date: new Date().toISOString() 
                }
            });

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "re",
                    to: "fe",
                    value: 100
                });
            
            expect(resposta.status).to.equal(201);
            
            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            delete resposta.body.date;
            delete respostaEsperada.date; 
            expect(resposta.body).to.deep.equal(respostaEsperada);

            // Um expect para comparar a Resposta.body com a String contida no arquivo
            // expect(resposta.body).to.have.property('from', 'julio');
            // expect(resposta.body).to.have.property('to', 'priscila');
            // expect(resposta.body).to.have.property('value', 100);
        });

        afterEach(() => {
            // Reseto o Mock
            sinon.restore();
        })
    });
});