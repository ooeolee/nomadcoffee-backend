require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";
import client from "./client.js";

const PORT = process.env.PORT;


const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    context: async ({ req }) => {
      return {
        client,
        loggedInUser: await getUser(req.headers.authorization || null),
      };
    },
  });

  const app = express();
  app.use(logger('tiny'));
  await apollo.start();
  app.use("/graphql",graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  apollo.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server: http://localhost:${PORT}${apollo.graphqlPath}`);
};

startServer();