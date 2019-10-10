/* eslint-disable no-return-assign */
/* eslint-disable jest/no-hooks */
/* eslint-disable jest/prefer-expect-assertions */
const request = require('supertest');
let res, server;

describe('test the example route and controller', () => {
    let path = '';
    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(() => {
        server.close();
    });
    const exec = () => {
        return request(server).get(path);
    };

    describe('/api/test', () => {
        it(`/api/test should return statusCode 200 and {'hello': 'world'}`, async () => {
            path = '/api/test';
            res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('hello', 'world');
        });
    });
    describe('/api/hello', () => {
        it(`/api/test should return statusCode 200 and {'example': 'is-working'}`, async () => {
            path = '/api/hello';
            res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('example', 'is-working');
        });
    });
    describe('/doesnotwork', () => {
        it(`/doesnotwork should return statusCode 404 and {'message': 'Not Found'}`, async () => {
            path = '/doesnotwork';
            res = await exec();
            expect(res.status).toBe(404);
            expect(res.body.message).toStrictEqual('Not Found');
            expect(res.body).toHaveProperty('message', 'Not Found');
        });
    });
});
