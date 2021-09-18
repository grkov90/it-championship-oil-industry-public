import { Redirect, Switch, Route } from 'react-router-dom';
import { ScenariosPage } from 'modules/Scenarios';
import { TreesPage } from 'modules/Trees';
import { FaultTreeNodeDictionaryPage } from 'modules/FaultTreeNodeDictionary';

export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/faultTreeNodeDictionary" component={FaultTreeNodeDictionaryPage} />
      <Route path="/trees" exact component={TreesPage} />
      <Route path="/scenarios" exact component={ScenariosPage} />
      <Redirect to="/faultTreeNodeDictionary" />
    </Switch>
  );
};
