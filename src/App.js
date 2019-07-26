import React from "react";
import immer from 'immer';

import Flash from "./components/Flash";


const makeTodo = todo => ({
  id: Math.ceil(Math.random() * 100000),
  ...todo
});


export const TodoContext = React.createContext();

function TodoProvider({ children }) {

  const initialState = [
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

  const [todos, setTodos] = React.useState(initialState);

  const [filterType, setFilterType] = React.useState('pending');

  const initialContext = React.useMemo(() => ({
    todos, setTodos, filterType, setFilterType
  }),
    [ todos, setTodos, filterType, setFilterType ]
  );

  return (
    <TodoContext.Provider value={initialContext}>
      {children}
    </TodoContext.Provider>
  )
}

export default function App() {

  return (
    // Every Context Provider passes a new object or function execution
    <TodoProvider>
      <div>
        <FilterBar />
        <br />
        <Todos />
        <br />
        <AddTodo />
      </div>
    </TodoProvider>
  );
}

function FilterBar() {

  const { filterType, setFilterType } = React.useContext(TodoContext);

  return (
    <div>
      <Filter
        onClick={() => setFilterType('pending')}
        active={filterType === 'pending'}
      > Pending </Filter>
      <Filter
        onClick={() => setFilterType('done')}
        active={filterType === 'done'}
      > Done </Filter>
      <Filter
        onClick={() => setFilterType('all')}
        active={filterType === 'all'}
      > All </Filter>
    </div>
  );
}

function Filter({ active, children, ...rest }) {

  return (
    <Flash
      type="button"
      {...rest} style={{ background: active ? "yellow" : "initial" }}
    >
      {children}
    </Flash>
  );
}

function Todos() {
  const { filterType, todos, setTodos } = React.useContext(TodoContext);

  let filteredTodos;

  switch (filterType) {
    case 'pending':
      filteredTodos = todos.filter(t => !t.done);
      break;
    case 'done':
      filteredTodos = todos.filter(t => t.done);
      break;
    case 'all':
      filteredTodos = todos;
      break;
  }
  return (
    <Flash
      type="div"
      style={{
        padding: ".25rem"
      }}
    >
      {filteredTodos.map(todo => (
        <Todo key={todo.id} {...todo} setTodos={setTodos} />
      ))}
    </Flash>
  );
}

function Todo({ id, name, done }) {
  const { setTodos } = React.useContext(TodoContext);

  const handleToggle = () => {
    setTodos(oldTodos => immer(oldTodos, draft => {
      const todo = draft.find(d => d.id === id);
      todo.done = !todo.done;
    }));
  }

  return (
    <Flash
      type="div"
      style={{ padding: ".25rem", textDecoration: done ? "line-through" : "none" }}
    >
      <button onClick={handleToggle}>✅</button> {name}
    </Flash>
  );
}

function AddTodo() {
  const { setTodos } = React.useContext(TodoContext);
  const [value, setValue] = React.useState("");

  const addTodo = () => {
    setTodos(old => ([
      ...old,
      makeTodo({ name: value }),
    ]))
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
