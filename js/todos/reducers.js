import {actions} from './actions';

/* ===========================================================
 ° Reducers are pure functions (no side effect or mutate state)
 ° The return a modified copy
 ° Every reducer returns a defined property of the state
 ============================================================ */

export function isFailed(state = false, action) {
  switch (action.type) {
    case actions.REQUEST_FAILED:
      return action.isFailed;
    default:
      return state;
  }
}

export function isLoading(state = false, action) {
  switch (action.type) {
    case actions.REQUEST_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function todos(state = [], action) {
  switch (action.type) {
    case actions.REQUEST_SUCCESS:
      return action.todos;

    case actions.FORMAT_TODOS:
      return state.map(todo => {
        return {
          createdFormatted: formatDate(todo.created),
          ...todo
        };
      });
    case actions.ADD_TODO:
      return [
        ...state,
        {
          title: action.title,
          created: action.created,
          completed: false
        }
      ];
    case actions.TOGGLE_COMPLETED:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return {...todo};
        }
      });
    case actions.DELETE_TODO: {
      return state.filter((todo, index) => {
        if (index === action.index) {
          return false;
        }
        return true;

      });
    }
    default:
      return state;
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const dateNum = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hrs = date.getHours().toString().padStart(2, '0');
  const mins = date.getMinutes().toString().padStart(2, '0');

  return `${dateNum}.${month}.${year} at ${hrs}:${mins} hr`;
}