export default function(d3) {

  var DOMNode;

  return {

    create(node, dimensions) {

      DOMNode = node;

      var svg = d3.select(DOMNode).append("svg")
          .attr("class", "bar-chart")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height);

      return this;
    },
    update(dimensions, state) {

      const name = state.name;
      const type = state.type
      const data = state.data;

      var y = d3.scale.linear()
          .domain([0, 100])     // domain is percentage
          .range([dimensions.height, 0]);

      var barWidth = dimensions.width / data.length;

      var locations = d3.select(DOMNode).select("svg")
        .selectAll(".bar-chart__location--group")
          .data(data, (d) => { return d.name }); // index data by location name

      locations.enter().append("g")
          .attr("class", "bar-chart__location--group")
          .attr("transform", (d, i) => {
            return `translate(${i * barWidth}, 0)`;
          });

      locations.exit()
          .remove();

      createBars(locations, "overweight", "#45C3ED");
      createBars(locations, "obese", "#3C4ED6");

      function createBars(parent, description, color) {

        var group = locations.append("g")
            .attr("class", `bar-chart__${description}--group`);

        // bar
        group.append("rect")
            .attr("class", `bar-chart__${description}--bar`)
            .attr("y", (d) => { return y(d[description]); })
            .attr("height", (d) => {
              return dimensions.height - y(d[description]);
            })
            .attr("width", barWidth - (barWidth * 0.1))
            .style("fill", color);

        // text
        group.append("text")
            .attr("class", `bar-chart__${description}--text`)
            .attr("x", barWidth / 2)
            .attr("y", (d) => { return y(d[description]) + 3; })
            .attr("dy", "0.75em")
            .attr("text-anchor", "middle")
            .attr("fill", "#FFF")
            .style("font", "0.8em sans-serif")
            .text((d) => { return `${d[description].toFixed()}%`; });
      }
    },
    destroy() {}
  }
};
