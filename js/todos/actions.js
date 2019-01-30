
/*
° the only way to modify the state is through actions or action creators
° Actions describe what should change
° Action creators a function that returns an action
 */
export const actions = {
  REQUEST_FAILED: 'REQUEST_FAILED',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_LOADING: 'REQUEST_LOADING',
  FORMAT_TODOS: 'FORMAT_TODOS',
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

function todosFormat(todos){
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

/**
 * Thunk returns a function
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