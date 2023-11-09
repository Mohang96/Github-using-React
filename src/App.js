import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Github from './components/Github'
import RepoDetails from './components/RepoDetails'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Github} />
      <Route path="/repos/:repoId/" component={RepoDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
