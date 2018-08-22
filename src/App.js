import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import ModelUpdate from './components/ModelUpdate'

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      selectedTodo: null,
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  delete(id){
    const url = `http://localhost/symfony-api/public/index.php/api/Delete/${id}`;
    fetch(url,{
      method:'POST'
    })
      .then((response)=>{
        return response.json();
      })
      .then((response) => {
        if(response.borrado === true) {
          const {todos} = this.state;

          this.setState({
            todos: todos.filter((todo) => todo.id !== id)
          });

          alert(response.msg);
        } else {

          alert(response.msg);
        }

      }).catch(err => console.log(err))
  }

  removeTodo(id) {
    if(window.confirm(`Seguro quieres eliminar la tarea numero ${id}`)){
      this.delete(id);
    }
  }

  componentDidMount(){
    this.fetchData()
  }


  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  fetchData(){
    const url = "http://localhost/symfony-api/public/index.php/api/Listar";
    fetch(url,{
      method:'POST',
    })
      .then((response) =>{
        return response.json()
      })
      .then((recurso) => {
        this.setState({
          todos: recurso,
        });
      });
  }

  updateTodo(updatedTodo) {
    const {todos} = this.state;
    const newTodos = [...todos];
    todos.forEach((todo, key) => {
      if(todo.id === updatedTodo.id) {
        newTodos[key] = updatedTodo;
      }
    });
    this.setState({
      todos: newTodos,
    });
  }


  render() {
    const {selectedTodo} = this.state;
    const idModal = `myModal`;
    const todos = this.state.todos.map((todo, i) => {

      return (
                <div className="col-md-6" key={`todo-item-${i}`}>

                  <div className="card mt-4">
                    <div className="card-title text-center">
                      <h3>{todo.title}</h3>
                    </div>
                    <div className="card-body">
                      {todo.description}
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-danger"
                        onClick={() => this.removeTodo(todo.id)}>
                        Delete
                      </button>

                      <button
                        id='btn-update'
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target={`#${idModal}`}
                        onClick={() => this.setState({selectedTodo: todo})}
                      >
                        Update
                      </button>
                    </div>

                  </div>
                </div>

      )
    });

    return (
      <div className="App">
        <div className="container">
          <div className="row mt-4">

            <div className="col-md-4 text-center">
                <img src={logo} className="App-logo" alt="logo" />
              <TodoForm onAddTodo={this.handleAddTodo}></TodoForm>
            </div>

            <div className="col-md-8">
              <div className="row">
                {todos}
                <ModelUpdate idModal={idModal} task={selectedTodo} onUpdate={this.updateTodo.bind(this)}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
