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
      deleteList: (state, action) => {
         const lists = state.lists.filter((list) => list.id !== action.payload);
         state.lists = lists;
      },
      createTodo: (state, action) => {
         return {
            ...state,
            lists: [
               ...state.lists.filter((list) => list.id !== action.payload.listid),
               {
                  ...state.lists.find((list) => list.id === action.payload.listid),
                  todos: [
                     ...state.lists.find((list) => list.id === action.payload.listid).todos,
                     { text: action.payload.text, status: 0, id: uuidv4(), isEdited: false },
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
      editTodo: (state, action) => {
         state.lists = action.payload;
      },
   },
});

export const { createList, deleteList, createTodo, updateLocalStore, updateStatus, editTodo } = listsSlice.actions;

export default listsSlice.reducer;
