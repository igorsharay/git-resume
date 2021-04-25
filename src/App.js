import { Redirect, Route, Switch } from 'react-router';
import Home from "./components/Home/index";
import Page404 from "./components/Page404/index";
import Resume from "./components/Resume/index";
import './style.css';

function App() {
  return (
    <div className="container d-flex align-items-center">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:username" component={Resume} />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
