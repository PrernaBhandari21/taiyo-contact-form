import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';

const fetchChartData = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
};

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);

  const fetchCountryData = async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');
    const data = res.data;

    const countryData = data.map((country) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));

    setCountryData(countryData);
  };

  useEffect(() => {
    fetchChartData().then((res) => setChartData({
      labels: Object.keys(res.data.cases),
      datasets: [
        {
          label: "COVID-19 Cases",
          data: Object.values(res.data.cases),
          backgroundColor: "red",
        }
      ]
    }));
    fetchCountryData();
  }, []);

  useEffect(() => {
    const chartConfig = {
      type: 'line',
      data: chartData,
    };

    const myChart = new Chart(document.getElementById('myChart'), chartConfig);
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full sm:w-4/5 p-4 border border-gray-400 shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">COVID-19 Dashboard</h2>
        <div className="mb-10">
          <canvas id="myChart" width={window.innerWidth > 900 ? 800 : 400} height="300"></canvas>
        </div>
        <div className="mt-20">
          <MapContainer center={[0, 0]} zoom={2} style={{ width: '100%', height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countryData.map((country) => (
              <Marker key={country.name} position={[country.lat, country.long]}>
                <Popup>
                  <h4>{country.name}</h4>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered Cases: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsAndMaps;
