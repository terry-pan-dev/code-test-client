import React from 'react'
import Header from './components/common/header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './components/contexts/authContext'
import {
  Home,
  SignUp,
  Login
} from './components/pages'


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;