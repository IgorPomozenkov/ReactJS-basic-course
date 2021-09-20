import React from 'react'
import { store } from './store/store'
import { Provider } from "react-redux"
import Routes from './components/Routes'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App