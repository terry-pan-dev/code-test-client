import React from 'react'
import Header from './components/common/header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './components/contexts/authContext'
import {
  Home,
  SignUp,
  Login,
  Map,
  PasswordReset
} from './components/pages'
import PrivateRoute from './components/common/route/privateRoute'


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/password-reset' component={PasswordReset} />
          <PrivateRoute path='/map' component={Map} />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;