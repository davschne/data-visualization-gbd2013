export default function(d3) {

  var svg;

  return {

    create(node, dimensions) {

      svg = d3.select(node).append("svg")
          .attr("class", "bar-chart")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height);

      return this;
    },
    update(dimensions, state) {

      const name = state.name;
      const type = state.type
      const data = state.data;

      const margin = {
        top: 20, right: 0, bottom: 100, left: 50
      };

      const width = dimensions.width - margin.left - margin.right;
      const height = dimensions.height - margin.top - margin.bottom;

      svg.attr("transform", `translate(${margin.left}, ${margin.top})`);

      var x = d3.scale.ordinal()
          .domain(data.map( (d) => { return d.name; } ))
          .rangeRoundBands([0, width], 0.1, 0.1);

      var y = d3.scale.linear()
          .domain([0, 1])     // domain is percentage
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5, "%");

      var barWidth = width / data.length;

      // x axis
      svg.append("g")
          .attr("class", "bar-chart__x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
        .selectAll(".tick text")
          .call(wrap, x.rangeBand());

      // y axis
      svg.append("g")
          .attr("class", "bar-chart__y-axis")
          .call(yAxis);

      var locations = svg.selectAll(".bar-chart__location--group")
          .data(data, (d) => { return d.name }); // index data by location name

      locations.enter().append("g")
          .attr("class", "bar-chart__location--group")
          .attr("transform", (d, i) => {
            return `translate(${x(d.name)}, 0)`;
          });

      locations.exit()
          .remove();

      createBars(locations, "overweight", "#45C3ED");
      createBars(locations, "obese", "#3C4ED6");


      function createBars(parent, metric, color) {

        var group = locations.append("g")
            .attr("class", `bar-chart__${metric}--group`);

        // bar
        group.append("rect")
            .attr("class", `bar-chart__${metric}--bar`)
            .attr("y", (d) => { return y(d[metric]); })
            .attr("height", (d) => {
              return height - y(d[metric]);
            })
            .attr("width", x.rangeBand())
            .style("fill", color);

        // text
        group.append("text")
            .attr("class", `bar-chart__${metric}--text`)
            .attr("x", x.rangeBand() / 2)
            .attr("y", (d) => { return y(d[metric]) + 3; })
            .attr("dy", "0.75em")
            .attr("text-anchor", "middle")
            .attr("fill", "#FFF")
            .style("font", "0.8em sans-serif")
            .text((d) => { return `${(d[metric] * 100).toFixed()}%`; });
      }

      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
    },
    destroy() {}
  }
};
