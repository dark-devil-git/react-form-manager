import { Provider } from "react-redux";
import { Routing } from "./Component/Routing";
import { Store } from "./Component/Store"; 

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Routing/>
      </Provider>
    </div>
  );
}

export default App;
