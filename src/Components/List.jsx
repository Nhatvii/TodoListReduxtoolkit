import React, { useState } from "react";
import { Input, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./List.css";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem, setIsDone } from "./TodoListSlice";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function List(props) {
  const { id, text, isDone } = props;
  const dispatch = useDispatch();
  const [title, settitle] = useState("");

  const handlekeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      dispatch(updateItem({ id: id, title: title }));
    }
  };
  // const handleDelete = () => {
  //   return ;
  // }
  const handleDeleteConfirm = () => {
    confirmAlert({
      title:"Confirm to delete",
      message:"Are you sure to do this.",
      buttons:[
        {
          label:"Yes",
          onClick: () => {dispatch(deleteItem({ id: id }))}
        },
        {
          label:"No",
        }
      ]
    });
  };
  return (
    <div className="list-info">
      <Checkbox
        onChange={(e) =>
          dispatch(setIsDone({ id: id, isDone: e.target.checked }))
        }
        defaultChecked={isDone}
      />
      <Input value={text} />
      {/* <DeleteOutlined onClick={() => dispatch(deleteItem({ id: id }))} /> */}
      {/* <DeleteOutlined onClick={() => {if(window.confirm("Are you sure to delete this?")) dispatch(deleteItem({ id: id })) }} /> */}
      <DeleteOutlined onClick={() => handleDeleteConfirm(id)} />
      <Popup trigger={<EditOutlined />} position="right center">
        <Input
          value={title}
          onChange={(event) => settitle(event.target.value)}
          onKeyDown={handlekeyDown}
          style={{ width: "100%", outline: "none", border: "none" }}
        />
      </Popup>
    </div>
  );
}
