const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../app');
const { from } = require('form-data');

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
        });
    });
    