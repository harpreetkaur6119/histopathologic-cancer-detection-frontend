import logo from './logo.svg';
import './App.css';
import Tabs from "./Components/Tabs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="inlineBlock App-logo" src={logo} alt="Cancer Knot"/>
          <h1 className="inlineBlock"> Histopathologic Cancer Detection </h1>
          <img className="inlineBlock App-logo right-knot-left-padding" src={logo} alt="Cancer Knot"/>
        </div>
      </header>
      <Tabs/>
    </div>
  );
}

export default App;
