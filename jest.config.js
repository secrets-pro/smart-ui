module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.jsx?$": "babel-7-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub"
  },

  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "/^.+.(css|less)$/": "identity-obj-proxy"
  },
  // snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  collectCoverageFrom: ["src/components/**/*.{js,vue}", "!**/node_modules/**"],
  coverageReporters: ["html", "text-summary", "lcov", "clover"],
  coverageDirectory: "./coverage/",
  collectCoverage: true
};
