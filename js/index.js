import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as actions from './todos/actions';
import {isFailed, isLoading, todos} from './todos/reducers';

function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

var reducers = combineReducers({
  counter,
  isFailed,
  isLoading,
  todos
});
var store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
var valueEl = document.getElementById('value');

var state;
const todosList = document.getElementById('todos_list');

function render() {
  state = store.getState();
  valueEl.innerHTML = state.counter;

  if (state.todos) {
    todosList.innerHTML = '';
    state.todos.forEach(todo => {
      const li = document.createElement('li');
      li.classList.add('todo')
      li.innerHTML = `
        <span>${todo.title}</span><input type="checkbox"/>
        <time>${todo.createdFormatted}</time>
      `;
      todosList.appendChild(li);
    });
  }
}

render();
store.subscribe(render);
document.getElementById('increment')
  .addEventListener('click', function() {
    store.dispatch({type: 'INCREMENT'});
  });
document.getElementById('decrement')
  .addEventListener('click', function() {
    store.dispatch({type: 'DECREMENT'});
  });
document.getElementById('incrementIfOdd')
  .addEventListener('click', function() {
    if (store.getState() % 2 !== 0) {
      store.dispatch({type: 'INCREMENT'});
    }
  });
document.getElementById('incrementAsync')
  .addEventListener('click', function() {
    setTimeout(function() {
      store.dispatch({type: 'INCREMENT'});
    }, 1000);
  });

store.dispatch(actions.getRequest('https://api.myjson.com/bins/xftrs'));