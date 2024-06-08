module.exports = {
  apps: [
    {
      name: "myApp",
      script: "./build/index.js", // Replace with the path to your main application file
      watch: true,
      ignore_watch: ["node_modules", "logs"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
