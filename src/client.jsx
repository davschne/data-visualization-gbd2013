// import libraries
import d3       from "d3";
import React    from "react";
import ReactDOM from "react-dom";

// import data
import locations from "../public/data/locations.json";
import data      from "../public/data/data.json";

// import factories for modules
import loadDataModel  from "./modules/DataModel.js";
import loadD3BarChart from "./modules/D3BarChart.js";

// import factories for React components
import loadSelector     from "./ui_components/Selector.jsx";
import loadBarChart     from "./ui_components/BarChart.jsx";
import loadBarChartCtrl from "./ui_components/BarChartCtrl.jsx";
import loadApp          from "./ui_components/App.jsx";

// create modules
const dataModel  = loadDataModel(data, locations);
const d3BarChart = loadD3BarChart(d3);

// create React components
const Selector     = loadSelector(React);
const BarChart     = loadBarChart(React, d3BarChart);
const BarChartCtrl = loadBarChartCtrl(React, dataModel, BarChart);
const App          = loadApp(React, BarChartCtrl, Selector);

ReactDOM.render(<App/>, document.getElementById('app'));
