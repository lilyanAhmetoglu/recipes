import { gql } from "apollo-boost";

/*Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      description
      instructions
      category
    }
  }
`;
/*User query */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinedDate
      email
    }
  }
`;

/*Recipes Mutation */

/*Recipes Queries */

export const GET_RECIPE = gql`
query($_id:ID!){
  getRecipe(_id:$_id){
    _id
    name
    category
    description
    instructions
    createdDate
    likes
  }
}
`;

/*User Mutation */

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
