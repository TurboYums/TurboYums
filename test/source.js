//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Book = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

describe('Source', () => {
    describe('/POST Create Source', () => {
        it('it should fail to create a source', (done) => {
            let user = {
                username: 'testUser',
                firstname: 'Joe',
                lastname: 'Smith',
                password: 'testingpass',
                accountType: '0',
                email: 'test@test.com',
                stripe_id: 'cus_EmLn89tIw40A5O'
            }
            let source = {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2020,
                cvc: '123',
                user: user,
            }
            
            chai.request(server)
                .post('/api/sources/create')
                .send(source)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });

    });

    describe('/POST Get Sources', () => {
        it('it should get all sources', (done) => {
            let user = {
                stripe_id: 'cus_EmLn89tIw40A5O'
            }
            let source = {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2020,
                cvc: '123',
                user: user,
            }
            
            chai.request(server)
                .post('/api/sources/get')
                .send(source)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.sources.should.be.a('array');
                    done();
                });
        });

    });

});