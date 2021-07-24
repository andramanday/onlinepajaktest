module.exports = {
    setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/setUpTests.js',
      }
};