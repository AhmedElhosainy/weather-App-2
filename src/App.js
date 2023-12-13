import { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import Forecast from "./components/forcast/Forcast";
import Header from "./components/Header/Header";

function App() {
  const [current, setcurrent] = useState(null);
  const [forecase, setforecase] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecasFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecasFetch])
      .then(async (res) => {
        const currentRes = await res[0].json();
        const forecaseRes = await res[1].json();
        setcurrent({ city: searchData.label, ...currentRes });
        setforecase({ city: searchData.label, ...forecaseRes });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Header />
      <Search onSearchChange={handleOnSearchChange} />
      {current && <CurrentWeather data={current} />}
      {forecase && <Forecast data={forecase} />}
    </div>
  );
}
export default App;
