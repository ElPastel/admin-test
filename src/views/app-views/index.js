import React, { lazy, Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Loading from "components/shared-components/Loading"
import { APP_PREFIX_PATH } from "configs/AppConfig"

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/basic`}
          component={lazy(() => import(`./basic`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/system`}
          component={lazy(() => import(`./system`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews)
