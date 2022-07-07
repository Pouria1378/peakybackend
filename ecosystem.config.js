module.exports = {
  apps: [
    // start point application
    {
      name: 'api',
      script: 'app.js',
      exec_mode: "cluster_mode",
      instances: "2"
    },

    // cron jobs
    // {
    //   "name": "cronJobs",
    //   "script": "./cron.js",
    //   "instances": 1
    // },

    // // workers
    // {
    //   "name": "smsWorker",
    //   "script": "./workers/smsWorker.js",
    //   "instances": 1
    // }
  ]
};