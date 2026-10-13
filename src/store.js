import { configureStore } from '@reduxjs/toolkit';
import TodoSlicer from "./TodoSlicer.js"

export let store = configureStore({
  reducer:{
    todos:TodoSlicer
  }
})