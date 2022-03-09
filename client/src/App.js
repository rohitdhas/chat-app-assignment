import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JoinRoom from "./pages/joinRoom";
import CreateRoom from "./pages/createRoom";
import PageNotFound from "./pages/404";
import Room from "./pages/room";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={JoinRoom} />
        <Route exact path="/create-room" component={CreateRoom} />
        <Route exact path="/room/:id" component={Room} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
