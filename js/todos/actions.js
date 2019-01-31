
/*
° the only way to modify the state is through actions or action creators
° Actions describe what should change
° Action creators a function that returns an action (or a fn in case of thunk)
 */
export const actions = {
  REQUEST_FAILED: 'REQUEST_FAILED',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_LOADING: 'REQUEST_LOADING',
  FORMAT_TODOS: 'FORMAT_TODOS',
  ADD_TODO: 'ADD_TODO',
  TOGGLE_COMPLETED: 'TOGGLE_COMPLETED',
  DELETE_TODO: 'DELETE_TODO'
}

function toggleIsLoading(isLoading){
  return {
    type: actions.REQUEST_LOADING,
    isLoading: isLoading,
  }
}

function todosReceived(todos){
  return {
    type: actions.REQUEST_SUCCESS,
    todos: todos
  }
}

export function todosFormat(todos){
  return {
    type: actions.FORMAT_TODOS,
    todos: todos
  }
}

function requestFailed(isError){
  return {
    type: actions.REQUEST_FAILED,
    isFailed: isError
  }
}

export function addTodo(title){
  return {
    type: actions.ADD_TODO,
    title: title,
    created: new Date().toISOString()
  }
}


export function toggleCompleted(index){
  return {
    type: actions.TOGGLE_COMPLETED,
    index: Number(index)
  }
}

export function deleteTodo(index){
  return {
    type: actions.DELETE_TODO,
    index: Number(index)
  }
}

/**
 * Thunk is an action creator that returns a function
 * @param url
 * @return {Function}
 */
export function getRequest(url){
  return dispatch => {
    dispatch(toggleIsLoading(true));

    fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error(res)
        }
        dispatch(toggleIsLoading(false))
        return res
      })
      .then(res=> res.json())
      .then(todos => dispatch(todosReceived(todos)))
      .then(todos => dispatch(todosFormat(todos)))
      .catch(()=>dispatch(requestFailed(true))) // todo handle
  }
}