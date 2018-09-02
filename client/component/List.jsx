import React from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: '',
      todos: []
    }
    this.onChange = this.onChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  addTodo() {
    axios.post('/todo', {
      todo: this.state.submit
    }).then(this.getTodos())
  }

  getTodos() {
    axios.get('/todo').then((todos) => {
      console.log(todos.data)
      this.setState({
        todos: todos.data
      })
    })
  }

  deleteTodo(deleted) {
    console.log('delete', deleted)
    axios.delete('/todo', {
      params: {
        todo: deleted
      }
    }).then(this.getTodos())
  }

  onChange(e) {
    this.setState({
      submit: e.target.value
    });
  }

  render() {
    return (
      <div>
      <input onChange={this.onChange}/>
      <button onClick={this.addTodo}>Add Todo</button>
      <br/>
        <div>
          {this.state.todos.map((todo, index) => (
            <ListEntry
              key={index}
              todo={todo}
              delete={this.deleteTodo}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default List;