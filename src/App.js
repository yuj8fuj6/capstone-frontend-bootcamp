import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Map from "./pages/Map";
import Circular from "./pages/Circular";
import { MapContextProvider } from "./contexts/MapContext";
import { UserContextProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <MapContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="main" element={<Landing />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<Contact />} />
            <Route path="map" element={<Map />} />
            <Route path="circular" element={<Circular />} />
          </Routes>
        </MapContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
