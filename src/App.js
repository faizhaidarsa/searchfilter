import React, { Component } from 'react'
import {Route, Switch ,withRouter} from 'react-router-dom'
import filterBE from './components/filterBE'
import 'bootstrap/dist/css/bootstrap.min.css'

export class App extends Component {
  render() {
    return (
        <Switch>
          <Route path ='/' component={filterBE}/>
        </Switch>
    )
  }
}

export default withRouter(App)
