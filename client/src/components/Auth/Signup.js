import React from "react";
import { ConnectionStates } from "mongoose";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class signup extends React.Component {
  state = {...initialState};

  clearState =() =>{
    this.setState({...initialState});
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(({data}) => {
      console.log(data);
      localStorage.setItem('token' , data.signupUser.token);
      this.clearState(); // clearing data after submit
    });
  }

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid = !username || !email || !password || !passwordConfirmation || password !== passwordConfirmation;
    return isInvalid

  }
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser,{ data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  placeholder="username"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                  placeholder="confirm password"
                />
                <button 
                disabled={loading || this.validateForm()}
                type="submit" className="button-primary">
                 
                  Submit
                </button>
                {error && error.message}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default signup;
