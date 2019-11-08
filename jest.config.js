module.exports = {
    ...require('./src/tests/jest-common'),
    projects: ['./src/tests/jest.lint.js', './src/tests/jest.server.js'],
    coverageDirectory: '../coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
};
