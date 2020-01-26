import React, { Component } from 'react';

class Form extends React.Component {
  render() {
    return (
      <div id="Form">
        <h3>Add a new item to the table:</h3>  
        <form >
          <label htmlFor="id">
          ID:
          <input id="id" value={this.props.newId} 
            type="text" name="id"
            onChange={this.props.handleInputChange} />
          </label>
          <label htmlFor="firstname">
          Firstname:
          <input id="firstname" value={this.props.newUsername} 
            type="text" name="firstname"
            onChange={this.props.handleInputChange} />
          </label>
          <label htmlFor="lastname">
          Latstname:
          <input id="lastname" value={this.props.newUsername} 
            type="text" name="lastname"
            onChange={this.props.handleInputChange} />
          </label>
          <label for="email">
          Email:
          <input id="email" value={this.props.newPassword} 
            type="email" name="email"
            onChange={this.props.handleInputChange} />
          </label>
          <label for="">
          Phone:
          <input id="phone" value={this.props.newPassword} 
            type="phone" name="phone"
            onChange={this.props.handleInputChange} />
          </label>
          <button type='submit' onClick={() => props.handleFormSubmit(value)} value="Submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default Form;