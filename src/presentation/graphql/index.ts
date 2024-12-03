import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema from './schema';

interface MyContext {
    token?: string;
  }

const app = express();

const httpServer = createServer(app);

const server = new ApolloServer<MyContext>({
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }), {
    async serverWillStart() {
      return {
        async drainServer() {
          await serverCleanup.dispose();
        },
      };
    },
  }, ],
  schema,
});

const wsServer = new WebSocketServer({
  path: '/graphql',
  server: httpServer,
});
  
const serverCleanup = useServer({ schema }, wsServer);

const main = async () => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  
  await server.start();
  
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port }, resolve),
  );
  
  console.log(`🚀  Server ready at: http://localhost:${port}/graphql`);
};

main();