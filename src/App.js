import React from "react";
import Flash from "./components/Flash";


const makeTodo = todo => ({
  id: Math.ceil(Math.random() * 100000),
  ...todo
});

const todos = [
  makeTodo({
    name: "Milk"
  }),
  makeTodo({
    name: "Eggs"
  }),
  makeTodo({
    name: "Flour",
    done: true
  }),
  makeTodo({
    name: "Syrup"
  })
];

export default function App() {
  return (
    <div>
      <FilterBar />
      <br />
      <Todos />
      <br />
      <AddTodo />
    </div>
  );
}

function FilterBar() {

  return (
    <div>
      <Filter type="pending" > Pending </Filter>
      <Filter type="done" > Done </Filter>
      <Filter type="all" > All </Filter>
    </div>
  );
}

function Filter({ active, children, ...rest }) {
  return (
    <Flash {...rest} style={{ background: active ? "yellow" : "initial" }} type="button" >
      {children}
    </Flash>
  );
}

function Todos() {
  return (
    <Flash
      type="div"
      style={{
        padding: ".25rem"
      }}
    >
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Flash>
  );
}

function Todo({ id, name, done }) {
  return (
    <Flash
      type="div"
      style={{ padding: ".25rem", textDecoration: done ? "line-through" : "none" }}
    >
      <button>✅</button> {name}
    </Flash>
  );
}

function AddTodo() {

  const [value, setValue] = React.useState("");

  const addTodo = () => {
    setValue('');
  }

  const handleSubmit = e => {
    e.preventDefault();
  };
  const handleOnChange = e => {
    setValue(e.target.value);
  };
  return (
    <Flash type="div">
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleOnChange} />{" "}
        <button onClick={() => addTodo()} type="submit">Add</button>
      </form>
    </Flash>
  );
}
