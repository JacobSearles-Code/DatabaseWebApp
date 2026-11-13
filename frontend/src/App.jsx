import DataCard from "./Components/DataCard.jsx";
import './index.css'
import Header from "./Components/Header.jsx";
import CustomQueryCard from "./Components/CustomQueryCard.jsx";
import FavDataCard from "./Components/FavGameCard.jsx";

function App() {

  return (
    <div className="appDiv">
        <Header />
        <DataCard />
        <FavDataCard />
        <CustomQueryCard />
    </div>
  )
}

export default App
