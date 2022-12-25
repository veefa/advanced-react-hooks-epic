##### 01.useReducer

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

##### 02.Memoization and React

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
# Output
```javascript

addTwo(3) // 5
addTwo(3) // 5, but this time we got it from the cache
// (we didn't have to recalculate it)
// I'll show up when we've memoized something

```
The basic idea of caching is: 
======> hang on to the input and their associated output and return that output again if called with the same input.

The point is to avoid re-calculating a value for which you already have the result cached. In our case, we're avoiding "input + 2" 
React's memoization
React has three APIs for memoization: memo, useMemo, and useCallback. The caching strategy React has adopted has a size of 1. That is, they only keep around the most recent value of the input and result.

### React's memoization

React has three APIs for memoization: `memo`, `useMemo`, and `useCallback`. The caching strategy React has adopted has a size of 1. That is, they only keep around the most recent value of the input and result.

So for React's memoization it's more like this:

```javascript

let prevInput, prevResult
function addTwo(input) {
  if (input !== prevInput) {
    prevResult = input + 2
  }
  prevInput = input
  return prevResult
}

```
# OUTPUT
```javascript

addTwo(3) // 5 is computed
addTwo(3) // 5 is returned from the cache
addTwo(2) // 4 is computed
addTwo(3) // 5 is computed

```
To be clear, in React's case it's not a !== comparing the prevInput. It checks equality of each prop and each dependency individually. Let's check each one:


## Using `memo`

```javascript

// React.memo's `prevInput` is props and `prevResult` is react elements (JSX)
const MemoComp = React.memo(Comp)

// then, when you render it:
<MemoComp prop1="a" prop2="b" /> // renders new elements

// rerender it with the same props:
<MemoComp prop1="a" prop2="b" /> // renders previous elements

// rerender it again but with different props:
<MemoComp prop1="a" prop2="c" /> // renders new elements

// rerender it again with the same props as at first:
<MemoComp prop1="a" prop2="b" /> // renders new elements

```


## Using `useMemo`

```javascript

// React.useMemo's `prevInput` is the dependency array
// and `prevResult` is whatever your function returns
const posts = React.useMemo(() => getPosts(searchTerm), [searchTerm])
// initial render with searchTerm = 'puppies':
// - getPosts is called
// - posts is a new array of posts

// rerender with searchTerm = 'puppies':
// - getPosts is *not* called
// - posts is the same as last time

// rerender with searchTerm = 'cats':
// - getPosts is called
// - posts is a new array of posts

// rerender render with searchTerm = 'puppies' (again):
// - getPosts is called
// - posts is a new array of posts

```


## Using `useCallback`

```javascript

// React.useCallback's `prevInput` is the dependency array
// and `prevResult` is the function
const launch = React.useCallback(() => launchCandy({type, distance}), [
  type,
  distance,
])
// initial render with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback this render

// rerender with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback last render 

// rerender with same type = 'twix' and distance '20m':
// - launch is equal to the callback passed to useCallback this render

// rerender with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback this render

```

## useEffect list of dependency
the dependency list of `useEffect`:

```javascript
React.useEffect(() => {
  window.localStorage.setItem('count', count)
}, [count]) // <-- that's the dependency list
```

# function as list of dependency

using the dependency function inside the `useEffect` hook will make it updatable but it will make the `useEffect` ruin every render.
 This is because `updateLocalStorage` is defined inside the component
function body. So it's re-initialized every render. Which means it's brand new
every render. Which means it changes every render. Which means our `useEffect` callback will be called every render!

```javascript
const updateLocalStorage = () => window.localStorage.setItem('count', count)
React.useEffect(() => {
  updateLocalStorage()
}, [updateLocalStorage]) // <-- function as a dependency
```

**This is the problem `useCallback` solves**. And here's how you solve it

```javascript
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count], // <-- yup! That's a dependency list!
)
React.useEffect(() => {
  updateLocalStorage()
}, [updateLocalStorage])
```
==> What that does is we pass React a function and React gives that same function back to us

==> this is not how React actually implements this function. We're just imagining!
```javascript

let lastCallback
function useCallback(callback, deps) {
  if (depsChanged(deps)) {
    lastCallback = callback
    return callback
  } else {
    return lastCallback
  }
}
```

So while we still create a new function every render (to pass to `useCallback`),
React only gives us the new one if the dependency list changes.

In this exercise, we're going to be using `useCallback`, but `useCallback` is
just a shortcut to using `useMemo` for functions:

```typescript
// the useMemo version:
const updateLocalStorage = React.useMemo(
  // useCallback saves us from this annoying double-arrow function thing:
  () => () => window.localStorage.setItem('count', count),
  [count],
)

// the useCallback version
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count],
)
```