import React from 'react';
import {ApolloConsumer} from 'react-apollo'
const Signout = () => (
  <ApolloConsumer>
      {client => {
          console.log(client);
          return (
            <button >signout</button>
          )
      }}
  </ApolloConsumer>
);

export default Signout;