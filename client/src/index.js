import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

document.getElementById('root')

ReactDOM.render(<Provider store={store}><App /></Provider>, root)