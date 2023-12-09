import { Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<homePage />}/>
      </Routes>
    </>
  );
}

export default App;
