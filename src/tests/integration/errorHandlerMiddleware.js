/* eslint-disable jest/no-hooks */
const request = require('supertest');
let res, server;

describe('test the errorHandler middleware', () => {
    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(() => {
        server.close();
    });
    const exec = () => {
        return request(server).get('/doesnotexist');
    };

    describe('route not found', () => {
        it(`/doesnotexist should return statusCode 404`, async () => {
            expect.assertions(1);
            res = await exec();
            expect(res.status).toBe(404);
        });
    });
});
