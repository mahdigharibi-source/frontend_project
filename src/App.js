import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "3e5bd531e51d02efe76d054a806159a2";
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [information, setInformation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city.trim() === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((res) => {
        if (!res.ok) throw new Error("❌ شهر پیدا نشد");
        return res.json();
      })
      .then((data) => {
        setError("");
        setInformation({
          temperature: data.main.temp,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          name: data.name,
          desc: data.weather[0].main,
        });
      })
      .catch((err) => {
        setInformation(null);
        setError(err.message);
      });
  }, [city]);

  // شهر اولیه
  useEffect(() => {
    setCity("Tehran");
  }, []);

  // تصاویر وضعیت هوا
  const weather = {
    Clear: "/images/clear.png",
    Wind: "/images/wind.png",
    Clouds: "/images/clouds.png",
    Mist: "/images/mist.png",
    Rain: "/images/rain.png",
    Snow: "/images/snow.png",
  };

  const clickSearch = () => {
    if (cityName.trim() === "") return;
    setCity(cityName);
  };

  return (
    <div className="container">
      <div className="weather">
        {/* جعبه جستجو */}
        <div className="searchBox">
          <input
            type="search"
            placeholder="نام شهر را وارد کنید..."
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={clickSearch}>جستجو</button>
        </div>

        {/* پیام خطا */}
        {error && <p className="error">{error}</p>}

        {/* اطلاعات هوا */}
        {information && (
          <>
            <div className="main_information">
              <div className="weatherImage">
                <img
                  src={weather[information.desc] || "/images/default.png"}
                  alt="weather"
                />
              </div>
              <div className="temperature">
                {Math.floor(information.temperature)}°C
              </div>
              <div className="city">{information.name}</div>
            </div>

            <div className="humidity-wind">
              <div className="wind">💨 {information.wind} m/s</div>
              <div className="humidity">💧 {information.humidity}%</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;








