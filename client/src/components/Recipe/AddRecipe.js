import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {ADD_RECIPE} from "../../queries";
import {withRouter} from 'react-router-dom'

const intialState = {
    name: "",
    instructions: "",
    category: "Breakfast",
    description: "",
    username: "",
  };

class AddRecipe extends Component {
  state={...intialState};

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  }
  handeChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  clearState = () => {
      this.setState({...intialState})
  }
  validateForm = () => {
    const { name, category, description, instructions } = this.state;
    const isInvalid = !name || !category || !description || !instructions;
    return isInvalid;
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({data})=> {
        console.log(data);
        this.clearState();
        this.props.history.push('/');
    });
  };
  render() {
    const { name, category, description, instructions, username } = this.state;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  onChange={this.handeChange}
                  placeholder="recipe name"
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handeChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handeChange}
                  value={description}
                />
                <textarea
                  name="instructions"
                  onChange={this.handeChange}
                  placeholder="Add Instructions"
                  value={instructions}
                ></textarea>
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  {" "}
                  Submit
                </button>
                {error && error.message}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddRecipe);