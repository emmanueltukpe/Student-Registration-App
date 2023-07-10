import App from './app';
import http from 'http';
import db from './db';
import env from '../common/config/env';


const start =async () => {
  try {
    const app = new App();
    const appServer = app.getServer();
    const httpServer = http.createServer(appServer);

    await db.connect()
    console.log('📦  MongoDB Connected!');

    httpServer.listen(env.port);
    httpServer.on('listening', () =>
      console.log(`🚀  ${env.service_name} is running. Listening on ` +
      env.port)
    );
    
  } catch (error) {
    console.log(error);
    
  }
}

start();
