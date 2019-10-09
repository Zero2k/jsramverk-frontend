module.exports = {
  presets: [
    [
      "@babel/react"
    ],
    [
      "@babel/preset-env",
      {
        "modules": "commonjs",
        "debug": false
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    ["@babel/plugin-proposal-class-properties"]
  ]
};
