import React from 'react'
import ReactDOM from 'react-dom/client'

import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './styles/index.css'

import { StateProvider } from './context/Sateprovider'
import { initialState } from './context/initialState'
import reducer from './context/reducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_ISSUER_BASE_URL}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </Auth0Provider>
    </Router>
  </React.StrictMode>
)
