
import { createSlice } from "@reduxjs/toolkit";

const TodoSlicer = createSlice({
  name: "todo",

  initialState: {
    todo: [],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todo.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },

    removeTodo: (state, action) => {
      state.todo = state.todo.filter(
        (item) => item.id !== action.payload
      );
    },

    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const item = state.todo.find((item) => item.id === id);

      if (item) {
        item.title = title;
      }
    },

    toggleTodo: (state, action) => {
      const item = state.todo.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
} = TodoSlicer.actions;

export default TodoSlicer.reducer;
