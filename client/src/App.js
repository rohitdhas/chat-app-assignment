import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JoinRoom from "./pages/joinRoom";
import CreateRoom from "./pages/createRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={JoinRoom} />
        <Route exact path="/create-room" component={CreateRoom} />
      </Switch>
    </Router>
  );
}

export default App;
