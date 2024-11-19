module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: 'dist/main.js', // This should point to the main file of your NestJS app
      instances: 1, // Set to 0 or 'max' to use all available CPU cores
      exec_mode: 'cluster', // Enables clustering to take advantage of multi-core systems
      autorestart: true, // Restart the app if it crashes
      watch: false, // Disable watch in production to avoid unintentional restarts
      max_memory_restart: '500M', // Restart if memory usage exceeds 500MB
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        // DATABASE_URL: 'mongodb://localhost:27017/dev-db',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 4000,
        // DATABASE_URL: 'mongodb://localhost:27017/staging-db',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        DATABASE_URL: 'mongodb://localhost:27017/prod-db',
      },
    },
  ],

  deploy: {
    production: {
      user: 'node',
      host: 'your-production-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/your-repo.git',
      path: '/var/www/nestjs-app-production',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
    staging: {
      user: 'node',
      host: 'your-staging-server.com',
      ref: 'origin/develop',
      repo: 'git@github.com:your-username/your-repo.git',
      path: '/var/www/nestjs-app-staging',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': '',
    },
  },
};
