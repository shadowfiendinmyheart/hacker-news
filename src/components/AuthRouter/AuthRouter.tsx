import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import MainPage from "../../pages/MainPage/MainPage";
import StoryPage from "../../pages/StoryPage/StoryPage";

import { ROUTES } from "../../constants/routes";

const AuthRouter: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.MAIN_PAGE} exact={true} component={MainPage} />
      <Route path={ROUTES.STORY_PAGE} component={StoryPage} />
      <Route path={ROUTES.ERROR_PAGE} component={ErrorPage} />

      <Redirect to={ROUTES.ERROR_PAGE} />
    </Switch>
  );
};

export default AuthRouter;
