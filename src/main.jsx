import React from 'react'
import ReactDOM from 'react-dom/client'
import { WheaterApp } from './WheaterApp.jsx'
import './styles/weatherStyles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WheaterApp />
  </React.StrictMode>,
)
