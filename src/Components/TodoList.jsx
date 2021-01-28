import React, { Component, useState } from "react";
import List from "./List";
import "antd/dist/antd.css";
import { Button, Input, Form, Switch } from "antd";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getTodoList,
  handleFilter,
  getIsFilter,
} from "./TodoListSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector(getTodoList);
  const isFilter = useSelector(getIsFilter);
  const addTask = (value) => {
    if (value) {
      var newItem = {
        text: value.text,
        id: Date.now(),
        isDone: false,
      };
      dispatch(addItem(newItem));
    }
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
    todoList.map((list, index) => {
      if (list.isDone) {
        return (
          <List
            index={index}
            id={list.id}
            text={list.text}
            isDone={list.isDone}
          />
        );
      }
    });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="parent">
        <div className="title-name">To do list</div>
        <div className="header-info">
          <Form
            {...layout}
            name="basic"
            onFinish={addTask}
            onFinishFailed={onFinishFailed}
          >
            <div className="flex-header">
              <Form.Item
                name="text"
                rules={[
                  { required: true, message: "Please input your task!!!" },
                ]}
              >
                <Input placeholder="New task" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
              <Form.Item className="form-switch">
                <div className="flex-switch">
                  <Switch onChange={() => dispatch(handleFilter())} />
                  <div>Done/not done</div>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
        {!isFilter ? renderListDone() : renderList()}
      </div>
    </div>
  );
}
