import React, { useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Apps.css"; // Make sure this file contains the CSS styles below

ChartJS.register(ArcElement, Tooltip, Legend);

const Apps = () => {
  const [symbol, setSymbol] = useState("MSFT");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStockData = async () => {
    setErrorMessage("");
    setData(null);

    try {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol,
          apikey: "YOUR_API_KEY", // Replace with your actual API key
        },
      });

      if (response.data.Note) {
        setErrorMessage("API limit reached, please try again later.");
        return;
      }
      if (response.data["Error Message"]) {
        setErrorMessage("Invalid symbol. Please try again.");
        return;
      }

      const timeSeries = response.data["Time Series (Daily)"];
      if (!timeSeries) {
        setErrorMessage("No data found for this symbol.");
        return;
      }

      const latestDate = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestDate];
      setData({ latestDate, latestData });
    } catch (error) {
      setErrorMessage("Error fetching data. Please try again.");
      console.error(error);
    }
  };

  const getChartData = () => {
    if (!data) return null;

    return {
      labels: ["Open", "High", "Low", "Close"],
      datasets: [
        {
          label: `${symbol} Prices`,
          data: [
            parseFloat(data.latestData["1. open"]),
            parseFloat(data.latestData["2. high"]),
            parseFloat(data.latestData["3. low"]),
            parseFloat(data.latestData["4. close"]),
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="centered-container">
      <div className="stock-dashboard-content">
        <h1 className="dashboard-title">Stock Dashboard</h1>

        <div className="search-form">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., MSFT)"
            className="search-input"
          />
          <button onClick={fetchStockData} className="search-button">
            Search
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {data && (
          <div className="stock-info">
            <h2>
              {symbol} - Latest Close: $
              {parseFloat(data.latestData["4. close"]).toFixed(4)}
            </h2>
            <p>Date: {data.latestDate}</p>
            <p>Open: ${parseFloat(data.latestData["1. open"]).toFixed(4)}</p>
            <p>High: ${parseFloat(data.latestData["2. high"]).toFixed(4)}</p>
            <p>Low: ${parseFloat(data.latestData["3. low"]).toFixed(4)}</p>
            <p>Volume: {data.latestData["5. volume"]}</p>

            <div className="chart-container">
              <Doughnut data={getChartData()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;