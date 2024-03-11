import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'


//if uncaught exception error happens into server then stop the server gracefully
process.on('uncaughtException', err => {
  console.error(err);
  process.exit(1);
})

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    console.log('database has been connected')

    app.listen(config.port, () => {
      logger.info(`app listening on port ${config.port}`)
    })
  } catch (error) {
      console.log('database dont want to connect ', error)
  }

  // if unhandled rejection happens then stop the server gracefully
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(0);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on("SIGTERM", () => {
  logger.info("sigterm recieved");
  if (server) {
    server.close()
  }
}) 