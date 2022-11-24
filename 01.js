import * as React from 'react'

/*function countReducer(state, newState) {
  return newState
}*/

const countReducer = (state, action) => ({...state, 
  ...(typeof action === 'function' ? action(state) : action)})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  //making our reducer support both the object as well as a function callback
  const increment = () =>
  setState(currentState => ({count: currentState.count + step})) 
  return <button onClick={increment}>{count}</button>
} 

function App() {
  return <Counter />
}

export default App

  
