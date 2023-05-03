import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactSwitch from "react-switch";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    callingApi();
  }, [checked]);
  const handleChange = (val) => {
    setChecked(!checked);
  };

  async function callingApi() {
    if (inputValue !== "") {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&cnt=5&units=${
            checked ? "metric" : "imperial"
          }&appid=337eaa2ba65564479244ff2634a42d1f`
        );
        setWeatherData(data?.list);
      } catch (err) {}
    }
  }

  return (
    <div className="App">
      <form className="input-wrapper">

        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Enter location"
        />
        <div className="toggle-switch" >
          <p>Farenhit</p>{" "}
          <ReactSwitch
            checked={checked}
            onChange={handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />{" "}
          <p>Celcius</p>
        </div>
      </form>
      <button className="search-button" onClick={callingApi}>
        Search
      </button>

      <div className="weather-data-wrapper">
        {weatherData.map((item) => {
          console.log();
          return (
            <div className="weather-item">
              <img src={`http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`} alt="" />
              <div>Temperature</div>
              <div className="temp">{item?.main?.temp} {checked?'Farenhit':'Celcius'}</div>
              <div>Humidity</div>
              <div className="humidity">{item?.main?.humidity}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
