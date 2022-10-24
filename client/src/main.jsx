import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { reducers } from './reducers'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='922223186760-5mke3kkp782m0u46lb1nfo1scc16h3le.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </Provider>
)
