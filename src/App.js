import "./styles.css";
import UserList from "./UserList";
import React, { useRef, useState } from "react";
import CreateUser from "./CreateUser";

export default function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  });

  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "velopert@naver.com",
      active: true
    },
    {
      id: 2,
      username: "tester",
      email: "tester211@naver.com",
      active: false
    },
    {
      id: 3,
      username: "lizzo",
      email: "imnotshine@naver.com",
      active: false
    }
  ]);
  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    //방법 1: ...users를 이용해 기존 배열을 가져오고 거기에 user을 붙여서 새로운 배열 제작
    //setUsers([...users, user]);

    //방법 2: comcat 함수를 이용해 기존 배열에 user를 추가해 새로운 배열 제작
    //concat 함수는 배열과 배열을 합치는 함수인데 배열과 다른 것을 합치는 것도 가능
    setUsers(users.concat(user));

    setInputs({
      username: "",
      email: ""
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}
