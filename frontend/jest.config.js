module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    // Handle imports like /src/components/SomeComponent
    "^@/(.*)$": "<rootDir>/src/$1",
    // Handle CSS imports (so Jest ignores them)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
