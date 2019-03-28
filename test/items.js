//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Book = require('../models/item');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block

describe('Items', () => {
    describe('/POST Create Item', () => {
        it('it should succesfully create an item', (done) => {
            let item = {
                itemName: 'testItem',
                itemPrice: '10',
                ingredient: 'testSauce, testCheese',
                description: 'testingDescription',
                rating: '0',
                category: 'testCat',
            }
            chai.request(server)
                .post('/api/items/create')
                .send(item)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('item');
                    done();
                });
        });

        describe('/GET Get All Items', () => {
            it('it should succesfully get all items', (done) => {
                chai.request(server)
                    .get('/api/items/getAll')
                    .send(items)
                    .end((err, res) => {
                        res.body.should.be.a('object');
                        res.body.should.have.property('items');
                        done();
                    });
            });
    
        });
    });