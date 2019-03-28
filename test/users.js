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

describe('Users', () => {
    describe('/POST Create User', () => {
        it('it should succesfully create a user', (done) => {
            let user = {
                username: 'testUser',
                firstname: 'Joe',
                lastname: 'Smith',
                password: 'testingpass',
                accountType: '0',
                email: 'test@test.com',
            }
            chai.request(server)
                .post('/api/users/create')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('text');
                    done();
                });
        });

    });


    describe('/POST Login User', () => {
        it('it should succesfully login a user', (done) => {
            let user = {
                username: 'testUser',
                password: 'testingpass',
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    done();
                });
        });

    });

    describe('/POST Clock In Employee', () => {
        it('it should successfully clock in an employee', (done) => {
            let user = {
                status: 1,
            }
            chai.request(server)
                .post('/api/users/clockIn')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('clockInSuccess');
                    done();
                });
        });
    });

    describe('/POST Clock Out Employee', () => {
        it('it should successfully clock in an employee', (done) => {
            let user = {
                status: 0,
            }
            chai.request(server)
                .post('/api/users/clockIn')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('clockOutSuccess');
                    done();
                });
        });
    });
});