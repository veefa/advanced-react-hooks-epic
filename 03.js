
import * as React from 'react'

//create your CountContext here with React.createContext
const CountContext = React.createContext();

//create a CountProvider component here that does this:
const CountProvider = (props) => {
  //1- get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0);
  //2- create a `value` array with count and setCount
  const value = [count, setCount];
  //3- return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

  return (
    <CountContext.Provider value={value} {...props} />
  );
};

function CountDisplay() {
  // get the count from useContext with the CountContext
  const [count] = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  //get the setCount from useContext with the CountContext
  const [, setCount] = React.useContext(CountContext)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  return (   
    <div>
      <button onClick={increment}>Increment count</button>
      <button onClick={decrement}>Decrement count</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
