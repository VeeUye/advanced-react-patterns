// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // The `callAll` function takes any number of function arguments and returns a new function.
  // When this new function is called, it invokes all the provided functions with the same arguments.
  // It is used in this context to combine the `onClick` and `toggle` functions into a single function,
  //  so that when the `onClick` event is triggered, both the `onClick` and `toggle` functions are called.

  const callAll = (...fns) => {
    return (...args) => {
      fns.forEach(fn => {
        fn && fn(...args)
      })
    }
  }

  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
