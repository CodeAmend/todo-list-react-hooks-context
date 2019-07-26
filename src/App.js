import React from "react";
import immer from 'immer';

import Flash from "./components/Flash";




const StoreContext = React.createContext();

function StoreProvider({ initialState, children }) {

  const [state, setState] = React.useState(initialState);

  const immerSetState = updater => setState(old => immer(old, updater));

  const contextValue = React.useMemo(() => [state, immerSetState], [state]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

const makeTodo = todo => ({
 id: Math.ceil(Math.random() * 100000),
 ...todo
});
  
function useTodos() {

  const [{ todos, filterType }, setStore] = React.useContext(StoreContext);

  const toggleTodo = id => {
    setStore(draft => {
      const todo = draft.todos.find(d => d.id === id);
      todo.done = !todo.done;
    });
  }

  const addTodo = name => {
    setStore(draft => {
      draft.todos.push(makeTodo({ name }))
    });
  }

  const setFilterType = type => {
    setStore(draft => {
      draft.filterType = type;
    })
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    filterType,
    setFilterType,
  }
}

const initialState = {
  todos: [
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
    }),
  ],
  filterType: 'pending',
};

export default function App() {

  return (
    // Every Context Provider passes a new object or function execution
    <StoreProvider initialState={initialState}>
      <div>
        <FilterBar />
        <br />
        <Todos />
        <br />
        <AddTodo />
      </div>
    </StoreProvider>
  );
}

function FilterBar() {

  const { filterType, setFilterType } = useTodos();

  const handleFilterTypeChange = type => {
    setFilterType(type);
  }

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
  const { filterType, todos } = useTodos();

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
        <Todo key={todo.id} {...todo} />
      ))}
    </Flash>
  );
}

function Todo({ id, name, done }) {
  const { toggleTodo } = useTodos(); 

  return (
    <Flash
      type="div"
      style={{ padding: ".25rem", textDecoration: done ? "line-through" : "none" }}
    >
      <button onClick={() => toggleTodo(id)}>✅</button> {name}
    </Flash>
  );
}

function AddTodo() {
  const { addTodo } = useTodos();
  const [value, setValue] = React.useState("");

  const handleAddTodo = () => {
    addTodo(value)
    setValue('');
  };

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
        <button onClick={() => handleAddTodo()} type="submit">Add</button>
      </form>
    </Flash>
  );
}
