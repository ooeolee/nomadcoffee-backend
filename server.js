require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async({req}) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(` 🪪Server is running on http://localhost:${PORT}🧸 ✅`)
  );
