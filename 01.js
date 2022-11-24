import * as React from 'react'

/*function countReducer(state, newState) {
  return newState
}*/

const countReducer = (state, action) => ({...state, ...action}) // merged these two things to get our new state values

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => setState({count: count + step})
  return <button onClick={increment}>{count}</button>
} 

function App() {
  return <Counter />
}

export default App

  
