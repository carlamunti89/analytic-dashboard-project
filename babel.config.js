module.exports = {
  presets: [
    "@babel/preset-env", // Para transpilar JS moderno
    ["@babel/preset-react", { runtime: "automatic" }], // Para transpilar JSX
  ],
};
