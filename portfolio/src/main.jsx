import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './ApiRequest'
import Weather from './ApiRequest'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>,
)
