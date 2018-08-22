import React, { Component } from 'react';
import ModelUpdate from "./ModelUpdate";


class TodoForm extends Component {
  constructor () {
    super();
    this.state = {
      title: '',
      description: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  insert(){
    const url = "http://localhost/symfony-api/public/index.php/api/Insert";
    const {title, description} = this.state;

    const data = {
      title: title,
      description: description,
    };

    fetch(url,{
      method:'POST',
      body: JSON.stringify({data: data}),
    })
      .then((response) =>{
        return response.json()
      })
      .then((recurso) => {
        if(recurso.guardado) {
          const {title, description} = this.state;

          this.props.onAddTodo({
            titulo: title,
            descripcion: description,
          });

          this.setState({
            title: '',
            description: ''
          });
        }
      });
  }

  handleSubmit(e) {
    this.insert();
    e.preventDefault();
  }

  handleInputChange(e, propName) {
    const {value} = e.target;
    this.setState({
      [propName]: value
    });
  }

  render() {
    return (
      <div className="card">
        <form onSubmit={this.handleSubmit} className="card-body">

          <div className="form-group">
            <input
              required='required'
              type="text"
              className="form-control"
              value={this.state.titulo}
              onChange={(e) => this.handleInputChange(e, "title")}
              placeholder="Title"
              />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.descripcion}
              onChange={(e) => this.handleInputChange(e, "description")}
              placeholder="Description"
              />
          </div>  

          <button type="submit" className="btn btn-primary">Save</button>

        </form>
      </div>
    )
  }
}

export default TodoForm;
