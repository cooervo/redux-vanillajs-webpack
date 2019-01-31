import {store} from '../index';
import * as actions from './actions';


const todoAdd = document.getElementById('todo_add');
const todoInput = document.getElementById('todo_input');

export function onAddTodo() {
  todoAdd.addEventListener('click', () => {
    store.dispatch(actions.addTodo(todoInput.value));
    store.dispatch(actions.todosFormat(store.todos));
  });
}

export function onMarkAsCompleted(todoEl) {
  const checkbox = todoEl.getElementsByTagName('input')[0];
  checkbox.onchange = e => {
    const index = todoEl.querySelector('[data-index]').getAttribute('data-index')
    store.dispatch(actions.toggleCompleted(index))
  };
}

export function onDelete(todoEl) {
  const btn = todoEl.getElementsByTagName('button')[0];
  btn.onclick = e =>{
    const index = todoEl.querySelector('[data-index]').getAttribute('data-index')
    store.dispatch(actions.deleteTodo(index))  }
}
