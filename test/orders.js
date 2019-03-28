//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Book = require('../models/order');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

describe('Orders', () => {
    describe('/POST Create Order', () => {
        it('it should succesfully create an order', (done) => {
            let order = {
                totalPrice: '40',
                specialRequest: 'made with love',
            }
            chai.request(server)
                .post('/api/orders/create')
                .send(order)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('order');
                    res.body.should.have.property('text');
                    done();
                });
        });
    });
});