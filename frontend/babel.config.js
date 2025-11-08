module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@/assets": "./src/assets",
            "@/components": "./src/components",
            "@/constants": "./src/constants",
            "@/config": "./src/config",
            "@/contexts": "./src/contexts",
            "@/services": "./src/services",
            "@/navigation": "./src/navigation",
            "@/screens": "./src/screens",
            "@/types": "./src/types",
            "@/utils": "./src/utils",
          },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      ],
    ],
  };
};
