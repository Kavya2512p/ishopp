import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Main from './Context/Main.jsx'
import { Provider } from "react-redux";
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <Main>
      <App />
    </Main>
  </Provider>
)
