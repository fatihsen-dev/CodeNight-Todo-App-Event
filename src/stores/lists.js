import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const listsSlice = createSlice({
   name: "listsSlice",
   initialState: {
      lists: localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : [],
   },
   reducers: {
      createList: (state, action) => {
         state.lists.push({
            id: uuidv4(),
            name: action.payload,
            todos: [],
         });
      },
      updateLocalStore: (state) => {
         localStorage.setItem("lists", JSON.stringify(state.lists));
      },
      removeList: () => {},
      createTodo: (state, action) => {
         return {
            ...state,
            lists: [
               ...state.lists.filter((list) => list.id !== action.payload.listid),
               {
                  ...state.lists.find((list) => list.id === action.payload.listid),
                  todos: [
                     ...state.lists.find((list) => list.id === action.payload.listid).todos,
                     { text: action.payload.text, status: 0, id: uuidv4() },
                  ],
               },
            ],
         };
      },
      updateStatus: (state, action) => {
         const lists = state.lists.filter((list) => list.id !== action.payload.listid);
         const findedList = state.lists.find((list) => list.id === action.payload.listid);
         const todos = findedList.todos.filter((todo) => todo.id !== action.payload.todoid);
         const findedTodo = findedList.todos.find((todo) => todo.id === action.payload.todoid);
         state.lists = [...lists, { ...findedList, todos: [...todos, { ...findedTodo, status: action.payload.status }] }];
      },
   },
});

export const { createList, removeList, createTodo, updateLocalStore, updateStatus } = listsSlice.actions;

export default listsSlice.reducer;
