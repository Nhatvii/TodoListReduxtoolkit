import React, { Component, useState } from "react";
import List from "./List";
import "antd/dist/antd.css";
import { Checkbox, Button } from "antd";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getTodoList,
  handleFilter,
  getTodoListDone,
  getIsFilter,
} from "./TodoListSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const [inputElement, setInputElement] = useState("");
  const todoList = useSelector(getTodoList);
  const todoListDone = useSelector(getTodoListDone);
  const isFilter = useSelector(getIsFilter);
  const addTask = () => {
    if (inputElement !== "") {
      var newItem = {
        text: inputElement,
        id: Date.now(),
        isDone: false,
      };
      const action = addItem(newItem);
      dispatch(action);
    }
    setInputElement("");
  };
  const renderList = () =>
    todoList.map((list, index) => {
      return (
        <List
          index={index}
          id={list.id}
          text={list.text}
          isDone={list.isDone}
        />
      );
    });
  const renderListDone = () =>
    todoListDone.map((list, index) => {
      return (
        <List
          index={index}
          id={list.id}
          text={list.text}
          isDone={list.isDone}
        />
      );
    });

  return (
    <div>
      <div className="parent">
        <div className="title-name">To do list</div>
        <div className="header-info">
          <div className="add-task">
            <input
              className="input-tag"
              type="text"
              onChange={(event) => setInputElement(event.target.value)}
              placeholder="Enter task"
            />
            <button className="button-tag" onClick={() => addTask()}>
              Add Task
            </button>
          </div>
          <Checkbox onChange={() => dispatch(handleFilter())}>
            Filter done/not done
          </Checkbox>
        </div>
        {!isFilter ? renderListDone() : renderList()}
      </div>
    </div>
  );
}
