import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Itempage from "./pages/Itempage";
import CardPage from "./pages/CardPage";
function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/items" element={<Itempage/>}/>
      <Route path="/card" element={<CardPage/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
