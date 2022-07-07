module.exports = {
  apps: [
    {
      name: 'api',
      script: 'app.js',
      exec_mode: "cluster_mode",
      instances: "2"
    }
  ]
};