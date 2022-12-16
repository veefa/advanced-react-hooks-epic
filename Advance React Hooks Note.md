### 01.useReducer

Call useReducer at the top level of your component to manage state with a reducer.

```javascript

import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });


```

useReducer returns an array with exactly two items:

1. The current state of this state variable, initially set to the initial state you provided.
2. The dispatch function (state updater) that lets you change it in response to interaction.

To update what’s on the screen, call dispatch with an object representing what the user did, called an action:


```javascript

function handleClick() {
  dispatch({ type: 'incremented_age' });
}

```

Note:
useReducer is very similar to useState, but it lets you move the state update logic from event handlers into a single function outside of your component.

### 02.Memoization and React

Memoization has to do with caching. Here's a super simple implementation of memoization:

```javascript
const cache = {}
function addTwo(input) {
    if(!cache.hasOwnProperty(input) {
        cache[input] = input + 2
    }
    return cache[input]
}
```
The basic idea is: hang on to the input and their associated output and return that output again if called with the same input.

The point is to avoid re-calculating a value for which you already have the result cached. In our case, we're avoiding "input + 2" 

## Output
```javascript

addTwo(3) // 5
addTwo(3) // 5, but this time we got it from the cache
// (we didn't have to recalculate it)
// I'll show up when we've memoized something

```
useCallback

React has three APIs for memoization: memo, useMemo, and useCallback. The caching strategy React has adopted has a size of 1. That is, they only keep around the most recent value of the input and result. There are various reasons for this decision, but it satisfies the primary use case for memoizing in a React context

