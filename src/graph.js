export default function() {
// // ADAPTED FROM : mbostock, Let's Make a Bar Chart III

// const width = 960;
// const height = 500;
// var y = d3.scale.linear()
//     .domain([0, 100])     // domain is percentage
//     .range([height, 0]);

// var chart = d3.selectAll(".chart");
// chart.attr("width", width).attr("height", height);

// function updateChart(data) {

//   var barWidth = width / data.length;

//   var bar = chart.selectAll("g")
//       .data(data)
//     .enter().append("g")
//       .attr("transform", (d, i) => {
//         return `translate(${i * barWidth}, 0)`;
//       });

//   bar.append("rect")
//       .attr("y", (d) => { return y(d.overweight); })
//       .attr("height", (d) => { return height - y(d.overweight); })
//       .attr("width", barWidth - 1);

//   bar.append("text")
//       .attr("x", barWidth / 2)
//       .attr("y", (d) => { return y(d.overweight) + 3; })
//       .attr("dy", "0.75em")
//       .text((d) => { return d.overweight; });
// }


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

}
