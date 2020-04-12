import React from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: "",
};

class Signin extends React.Component {
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

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(({data }) => {
      console.log(data);
      localStorage.setItem('token' , data.signinUser.token);
      this.clearState(); // clearing data after submit
    });
  }

  validateForm = () => {
    const { username, password} = this.state;
    const isInvalid = !username ||  !password ;
    return isInvalid

  }
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNIN_USER}
          variables={{ username, password }}
        >
          {(signinUser,{ data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  placeholder="username"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChange}
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

export default Signin;
