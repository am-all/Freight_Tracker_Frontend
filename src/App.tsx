import Homepage from './screen/home/home';
import PlaceInteraction from './screen/placeInteraction/placeInteraction';
import VehicleActivity from './screen/vehicleActivity/vehicleActivity';
import './App.css';
import {
Route,
BrowserRouter as Router,
Switch
} from 'react-router-dom'



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/place-interaction">
            <PlaceInteraction />
        </Route>
        <Route exact path="/vehicle-activity">
            <VehicleActivity />
        </Route>
        <Route exact path="/">
            <Homepage />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
