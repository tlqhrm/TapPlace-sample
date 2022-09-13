module.exports = {
  apps: [
    {
      name: 'tapplace',
      script: 'dist/main.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
