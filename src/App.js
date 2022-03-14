import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Bookshelf from './components/Bookshelf'
import BookDetails from './components/BookDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelf} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
