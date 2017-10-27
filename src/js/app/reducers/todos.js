// ------------------------------------
// Vars
// ------------------------------------
let _id = 0;

// ------------------------------------
// Const
// ------------------------------------
const ALL = 'all';
const ACTIVE = 'active';
const COMPLETE = 'complete';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const CHANGE_EDIT_TODO = 'CHANGE_EDIT_TODO';
export const SUBMIT_EDIT_TODO = 'SUBMIT_EDIT_TODO';
export const UPDATE_TYPE_LIST = 'UPDATE_TYPE_LIST';
export const REMOVE_ALL = 'REMOVE_ALL';

// ------------------------------------
// Actions
// ------------------------------------
export function addTodo(value) {
  return {
    type: ADD_TODO,
    payload: value
  };
}

export function toggleTodo(value) {
  return {
    type: TOGGLE_TODO,
    payload: value
  };
}

export function removeTodo(value) {
  return {
    type: REMOVE_TODO,
    payload: value
  }
}

export function editTodo(value) {
  return {
    type: EDIT_TODO,
    payload: value
  }
}

export function changeEditTodo(value) {
  return {
    type: CHANGE_EDIT_TODO,
    payload: value
  }
}

export function submitEditTodo(value) {
  return {
    type: SUBMIT_EDIT_TODO,
    payload: value
  }
}

export function updateTypeList(value) {
  return {
    type: UPDATE_TYPE_LIST,
    payload: value
  }
}

export function removeAll() {
  return {
    type: REMOVE_ALL
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_TODO]: (state, action) => {
    let newTodo = {
      id: _id,
      label: action.payload,
      editLabel: action.payload,
      complete: false,
      editable: false
    }
    _id++;

    return Object.assign({}, state, {
      todoList: [...state.todoList, newTodo]
    });
  },

  [TOGGLE_TODO]: (state, action) => {
    let toggleId = parseInt(action.payload);
    let immutableTodoList = state.todoList.map((item, i) => {
      if (toggleId === item.id) {
        item.complete = !item.complete;
      }
      return item;
    });

    return Object.assign({}, state, {
      todoList: immutableTodoList
    });
  },

  [REMOVE_TODO]: (state, action) => {
    let removeId = parseInt(action.payload);
    let immutableTodoList = [...state.todoList];
    for (var i = 0; i < immutableTodoList.length; i++) {
      if (immutableTodoList[i].id === removeId) {
        var num = i;
        break;
      }
    }
    immutableTodoList.splice(num, 1);

    return Object.assign({}, state, {
      todoList: immutableTodoList
    });
  },

  [EDIT_TODO]: (state, action) => {
    let editId = parseInt(action.payload);
    let immutableTodoList = state.todoList.map((item, i) => {
      if (editId === item.id) {
        item.editable = true;
      }
      return item;
    });

    return Object.assign({}, state, {
      todoList: immutableTodoList
    });
  },

  [CHANGE_EDIT_TODO]: (state, action) => {
    let editId = parseInt(action.payload.id);
    let editLabel = action.payload.label;
    let immutableTodoList = state.todoList.map((item, i) => {
      if (editId === item.id) {
        item.editLabel = editLabel
      }
      return item;
    });

    return Object.assign({}, state, {
      todoList: immutableTodoList
    });
  },

  [SUBMIT_EDIT_TODO]: (state, action) => {
    let editId = parseInt(action.payload);
    let immutableTodoList = state.todoList.map((item, i) => {
      if (editId === item.id) {
        item.label = item.editLabel
        item.editable = false;
      }
      return item;
    });

    return Object.assign({}, state, {
      todoList: immutableTodoList
    });
  },

  [UPDATE_TYPE_LIST]: (state, action) => {
    let val = action.payload;

    return Object.assign({}, state, {
      typeList: val
    });
  },

  [REMOVE_ALL]: (state, action) => {
    return Object.assign({}, state, {
      todoList: [],
      typeList: ALL
    })
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  todoList: [],
  typeList: ALL
};

export default function todosReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
