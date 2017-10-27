// import vendors
import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next-client';

// import classes
import { addTodo, toggleTodo, removeTodo, editTodo, changeEditTodo, submitEditTodo, updateTypeList, removeAll } from '../../reducers/todos';

// import styles
import styles from './styles';


const mapDispatchToProps = {
  addTodo: (value) => addTodo(value),
  toggleTodo: (value) => toggleTodo(value),
  removeTodo: (value) => removeTodo(value),
  editTodo: (value) => editTodo(value),
  changeEditTodo: (value) => changeEditTodo(value),
  submitEditTodo: (value) => submitEditTodo(value),
  updateTypeList: (value) => updateTypeList(value),
  removeAll: (value) => removeAll(value)
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  session: state.session
});


class Todos extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClickTodo = this.onClickTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
    this.onEditTodo = this.onEditTodo.bind(this);
    this.onChangeEditTodo = this.onChangeEditTodo.bind(this);
    this.onSubmitEditTodo = this.onSubmitEditTodo.bind(this);
    this.onClickFooter = this.onClickFooter.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    return (
      <div className={styles.todos}>
        <h1>{i18next.t('todos.title')}</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder={i18next.t('todos.what_todo')} value={this.state.inputValue} onChange={this.onInputChange} />
          <input type="submit" value={i18next.t('todos.submit')} />
        </form>
        {this._todoList()}
        {this._filter()}
      </div>
    )
  }


  //________________________________________________________
  // -                                       PRIVATE METHODS
  _todoList() {
    const todo = this.props.todos.todoList.map((item, i) => {

      switch (this.props.todos.typeList) {
        case 'all':
          return this._todoLi(item, i);
          break;
        case 'active':
          if (!item.complete) {
            return this._todoLi(item, i);
          }
          break;
        case 'complete':
          if (item.complete) {
            return this._todoLi(item, i);
          }
          break;
      }
    });

    return (
      <ul>
        {todo}
      </ul>
    );
  }


  _todoLi(item, i) {
    if (!item.editable) {
      let completeTodoCss = (item.complete) ? 'todo-complete' : '';

      return(
        <li key={i} id={item.id} className={completeTodoCss} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClickTodo} >
          {item.label}<span id={item.id} className="remove" onClick={this.onRemoveTodo}>X</span><span id={item.id} className="edit" onClick={this.onEditTodo}>{i18next.t('todos.edit')}</span>
        </li>
      );
    } else {
      return(
        <li key={i} id={item.id}>
          <form id={item.id} onSubmit={this.onSubmitEditTodo}>
            <input autoFocus type="text" id={item.id} value={item.editLabel} onChange={this.onChangeEditTodo} className="edit-input" />
          </form>
        </li>
      );
    }
  }


  _filter() {
    let len = this.props.todos.todoList.length;

    if (len > 0) {
      return(
        <div className="footer">
          <a href="#" className={this.props.todos.typeList === 'all' ? "footer-active" : ""} value="all" onClick={this.onClickFooter}>{i18next.t('todos.all')}</a>
          <p className="separator"> - </p>
          <a href="#" className={this.props.todos.typeList === 'active' ? "footer-active" : ""} value="active" onClick={this.onClickFooter}>{i18next.t('todos.active')}</a>
          <p className="separator"> - </p>
          <a href="#" className={this.props.todos.typeList === 'complete' ? "footer-active" : ""} value="complete" onClick={this.onClickFooter}>{i18next.t('todos.complete')}</a>
          <p className="separator"> - </p>
          <a href="#" className="remove-all" onClick={this.onRemoveAll}>{i18next.t('todos.remove_all')}</a>
        </div>
      );
    }
  }


  //________________________________________________________
  // -                                                EVENTS
  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const val = this.state.inputValue;
    if (val) {
      this.props.addTodo(val);
      this.setState({
        inputValue: ''
      });
    } else {
      alert(i18next.t('todos.empty_field'));
    }
  }

  onMouseEnter(e) {
    e.target.querySelector('.remove').style.visibility = 'visible';
    e.target.querySelector('.edit').style.visibility = 'visible';
  }

  onMouseLeave(e) {
    e.target.querySelector('.remove').style.visibility = 'hidden';
    e.target.querySelector('.edit').style.visibility = 'hidden';
  }

  onClickTodo(e) {
    const id = e.target.id;
    this.props.toggleTodo(id);
  }

  onRemoveTodo(e) {
    e.stopPropagation();
    const id = e.target.id;
    this.props.removeTodo(id);
  }

  onEditTodo(e) {
    e.stopPropagation();
    const id = e.target.id;
    this.props.editTodo(id);
  }

  onChangeEditTodo(e) {
    const editObj = {
      id: e.target.id,
      label: e.target.value
    }
    this.props.changeEditTodo(editObj);
  }

  onSubmitEditTodo(e) {
    e.preventDefault();
    const id = e.target.id;
    this.props.submitEditTodo(id);
  }

  onClickFooter(e) {
    e.preventDefault();
    const val = e.target.getAttribute('value');
    this.props.updateTypeList(val);
  }

  onRemoveAll(e) {
    e.preventDefault();
    this.props.removeAll();
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
