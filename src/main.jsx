import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux';
import store from './store/index.js';
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
    <App />
    <Toaster toastOptions={{
      position: 'top-center',
      style: {
        background: 'white',
        color: 'black'
      }
    }} />
  </Provider>
  </React.StrictMode>,
 </BrowserRouter>
)
