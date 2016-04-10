import React from "react";
import ReactDOM from "react-dom";
// import Papa from "papaparse";
import d3 from "d3";

// container for data model
var dataModel = Object.create(null);

Papa.SCRIPT_PATH = "papaparse.min.js";

// load data from CSV
Papa.parse("data/data.csv", {
  worker: true,
  header: true,
  download: true,
  dynamicTyping: true,
  preview: 5,
  step: function(row, parser) {
    console.log(row);
  },
  complete() {
    console.log("parse complete");
  }
});

// d3.csv(SOURCE_URL + "/data.csv", (data) => { console.log(data); });
// .row((row) => { console.log(row); });

// const App = React.createClass({
//   render() {
//     return (
//       <p>Hello, world!</p>
//     );
//   }
// });

// ReactDOM.render(<App/>, document.getElementById('app'));
