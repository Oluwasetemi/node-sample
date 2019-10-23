/* eslint-disable no-return-assign */
/* eslint-disable jest/no-hooks */
/* eslint-disable jest/prefer-expect-assertions */
const request = require('supertest');
let res, server, name;

describe('test the example route and controller', () => {
    let path = '';
    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(async () => {
        await server.close();
    });
    const exec = () => {
        return request(server).get(path);
    };

    describe('/api/test', () => {
        it(`/api/test should return statusCode 200 and {'hello': <name>}`, async () => {
            path = '/api/test';
            name = 'test';
            res = await request(server)
                .post(path)
                .send({ name });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('hello', name);
        });

        it(`pOST /api/test should return statusCode 200 and {'hello': stranger!} with req.body.name`, async () => {
            path = '/api/test';
            name = '';
            res = await request(server)
                .post(path)
                .send({ name });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('hello', 'stranger!');
        });
    });
    describe('/api/hello', () => {
        it(`/api/test should return statusCode 200 and {'example': 'is-working'}`, async () => {
            name = 'adewale';
            const age = 12;
            path = `/api/hello?name=${name}&age=${age}`;
            res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('example', 'is-working');
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
