import React, { lazy, Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Loading from "components/shared-components/Loading"

const Clients = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/client-list`} />
        <Route
          path={`${match.url}/client-list`}
          component={lazy(() => import(`./client-list`))}
        />
        <Route
          path={`${match.url}/:id`}
          component={lazy(() => import(`./client-profile`))}
        />
      </Switch>
    </Suspense>
  )
}

export default Clients
