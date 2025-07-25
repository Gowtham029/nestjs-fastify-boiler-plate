module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.module.ts',
    '!**/*interceptor*.ts',
    '!**/*filter*.ts',
    '!**/*strategy*.ts',
    '!**/*guard*.ts',
    '!**/node_modules/**',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['html', 'text', 'lcov'],
  testEnvironment: 'node',
};