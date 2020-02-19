const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser"); //Json Requests and Responses

const cors = require('cors'); // linking the react application to our backend

require("dotenv").config({ path: "variables.env" });

const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring in GraphQL-Express midleware

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

//Create Schema
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

//connect to database
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: false })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//initialize application
const app = express();

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOptions)) //using the 3000 for react applciation
// Create GrapiQl application

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//connect shcemas with GrapgQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
