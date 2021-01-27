import React, { useState } from "react";
import { Input, Switch } from "antd";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./List.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  updateItem,
  setIsDone,
  getIsFilter,
} from "./TodoListSlice";

export default function List(props) {
  const { index, id, text, isDone } = props;
  const dispatch = useDispatch();
  const [title, settitle] = useState("");

  const handlekeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      dispatch(updateItem({ id: id, title: title }));
    }
  };
  return (
    <div className="list-info">
      <Input value={text}></Input>
      <Switch
        onChange={(checked) => dispatch(setIsDone({ id: id, isDone: checked }))}
        checked={isDone}
      />
      <CloseCircleOutlined
        type="danger"
        shape="circle"
        onClick={() => dispatch(deleteItem({ id: id }))}
      >
        X
      </CloseCircleOutlined>
      <Popup trigger={<EditOutlined />} position="right center">
        <input
          value={title}
          onChange={(event) => settitle(event.target.value)}
          onKeyDown={handlekeyDown}
          style={{ width: "100%", outline: "none", border: "none" }}
        />
      </Popup>
    </div>
  );
}
