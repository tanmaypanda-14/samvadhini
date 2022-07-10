import Home from "./pages/home/Home";
import Documents from "./pages/documents/Documents";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element = {<Home/>}/>
            <Route path="documents" element = {<Documents/>}/>
            <Route path="users">
              <Route index element = {<List/>}/>
              <Route path=":userId" element = {<Single/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
