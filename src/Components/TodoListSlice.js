import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    todoListDone: [],
    isFilter: true,
  },
  reducers: {
    addItem: (state, action) => {
      state.todoList.push(action.payload);
    },
    deleteItem: (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
      let indexDone = state.todoListDone.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexDone !== -1) {
        state.todoListDone.splice(index, 1);
      }
    },
    updateItem: (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList[index].text = action.payload.title;
      }
      let indexDone = state.todoListDone.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexDone !== -1) {
        state.todoListDone[index].text = action.payload.title;
      }
    },
    setIsDone: (state, action) => {
      let index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList[index].isDone = action.payload.isDone;
      }
    },
    handleFilter: (state,action) => {
        state.todoListDone =[];
        state.todoList.map((ele) => {
            if(ele.isDone){
                state.todoListDone.push(ele);
            }
        })
        state.isFilter = !state.isFilter;
    }
  },
});

export const getTodoList = (state) => state.todo.todoList;
export const getTodoListDone = (state) => state.todo.todoListDone;
export const getIsFilter = (state) => state.todo.isFilter;
const { reducer, actions } = todoList;
export const { addItem, deleteItem, updateItem, setIsDone, handleFilter } = actions;
export default reducer;
