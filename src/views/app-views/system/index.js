import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Pages = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/system`} />
      <Route
        path={`${match.url}/system`}
        component={lazy(() => import(`../system`))}
      />
    </Switch>
  </Suspense>
);

export default Pages;
