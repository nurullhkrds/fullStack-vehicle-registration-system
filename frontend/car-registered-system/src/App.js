import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import Menu from './menu/Menu';
import Content from './components/Content';

function App() {
  const count = useSelector((state) => state.cars.value)

  return (
    <div className="App">
      

          <Menu/>
          <Content/>
          

    </div>
  );
}

export default App;
