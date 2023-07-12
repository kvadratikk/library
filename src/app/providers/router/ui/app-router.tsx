import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthorizationPageWrapper } from 'shared/ui/authorization-page-wrapper/authorization-page-wrapper';
import { DefaultPageWrapper } from 'shared/ui/default-page-wrapper/default-page-wrapper';
import { authorizationSelector } from 'store/selectors/authorization-selector';

import { routeConfig } from '../config/route-config';

export const AppRouter = () => {
  const { jwt } = useSelector(authorizationSelector);

  return (
    <Routes>
      {routeConfig.map(({ path, element, elementAuth }) => {
        const routeElement = jwt ? (
          <DefaultPageWrapper>{elementAuth}</DefaultPageWrapper>
        ) : (
          <AuthorizationPageWrapper>{element}</AuthorizationPageWrapper>
        );

        return <Route key={path} path={`/${path}`} element={routeElement} />;
      })}
    </Routes>
  );
};
