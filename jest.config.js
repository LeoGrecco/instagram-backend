module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
};