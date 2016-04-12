import d3 from "d3";
import React from "react";
import ReactDOM from "react-dom";

// import data
import locations from "../public/data/locations.json";
import data from "../public/data/data.json";

// import factory for data model
import loadDataModel from "./dataModel.js";

// import factories for React components
import loadGraph from "./components/Graph.jsx";
import loadGraphController from "./components/GraphController.jsx";
import loadApp from "./components/App.jsx";

// load data model
const dataModel = loadDataModel(data, locations);

// create React components
const Graph = loadGraph(React);
const GraphController = loadGraphController(React, dataModel, Graph);
const App = loadApp(React, GraphController);

ReactDOM.render(<App/>, document.getElementById('app'));
