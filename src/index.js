import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import './styles/global.scss'

// App -> what is imported
// app -> The HTML body element 
ReactDom.render(<App />, document.getElementById('app'))