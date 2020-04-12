const express = require("express");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser"); //Json Requests and Responses

const cors = require("cors"); // linking the react application to our backend

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
  resolvers: resolvers,
});

//connect to database
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: false })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//initialize application
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions)); //using the 3000 for react applciation

//set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"]; // sending our token from local storage to backend
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  console.log("lily's token" + token);
  next(); // calling the next function in middleware chane >> this is too much important
});

// Create GrapiQl application
// here we define /graphql as an end point for all my backend requests
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//connect shcemas with GrapgQL and with database
app.use(
  "/graphql", // using this endpoint for my resolver reuqests and functions
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
