import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashbord from "./page/Dashbord";
import Profile from "./page/Profile";
import Menu from "./page/Menu";
import Editrecipe from "./component/Popup/Editrecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/edit" element={<Editrecipe />}/>
      </Routes>
    </Router>
  );
}

export default App;
