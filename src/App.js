import { Route, Switch } from 'react-router';
import Home from "./components/Home/index";
import Resume from "./components/Resume/index";
import './style.css';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:username" component={Resume} />
      </Switch>
    </div>
  );
}

export default App;
