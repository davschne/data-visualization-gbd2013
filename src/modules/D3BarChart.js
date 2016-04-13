export default function(d3) {

  var svg;

  return {

    create(node) {

      svg = d3.select(node).append("svg")
          .attr("class", "bar-chart")

      return this;
    },
    update(dimensions, props) {

      const name = props.name;
      const type = props.type
      const data = props.data;
      const setLocation = props.setLocation;

      const margin = {
        top: 20, right: 0, bottom: 100, left: 50
      };

      const width = dimensions.width - margin.left - margin.right;
      const height = dimensions.height - margin.top - margin.bottom;

      svg.attr("transform", `translate(${margin.left}, ${margin.top})`)
          .attr("width", dimensions.width)
          .attr("height", dimensions.height);

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
          .ticks(4, "%");

      // remove previous axes
      svg.selectAll(".bar-chart__axis").remove();

      // append x-axis
      svg.append("g")
          .attr("class", "bar-chart__axis bar-chart__axis--x")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
        .selectAll(".tick text")
          .call(wrap, x.rangeBand());

      // append y-axis
      svg.append("g")
          .attr("class", "bar-chart__axis bar-chart__axis--y")
          .call(yAxis);

      var locations = svg.selectAll(".bar-chart__location")
          .data(data, (d) => { return d.name }); // index data by location name

      // enter selection
      locations.enter().append("g")
          .attr("class", "bar-chart__location")
          .call(createBars, "overweight")
          .call(createBars, "obese")
          // clicking on location group displays sub-locations
          .on("click", (d) => { setLocation(d.loc_id); } );

      // update selection
      locations.attr("transform", (d, i) => {
            return `translate(${x(d.name)}, 0)`;
          })
          .call(updateBars, "overweight")
          .call(updateBars, "obese");

      // exit selection
      locations.exit()
          .remove();

      function createBars(selection, metric) {

        var group = selection.append("g")
            .attr("class", `bar-chart__${metric}`);

        // bar
        group.append("rect")
            .attr("class", `bar-chart__bar bar-chart__bar--${metric}`);

        // text
        group.append("text")
            .attr("class", `bar-chart__value bar-chart__value--${metric}`);

        return selection;
      }

      function updateBars(selection, metric) {

        var group = selection.selectAll(`.bar-chart__${metric}`);

        // bar
        group.selectAll(`.bar-chart__bar--${metric}`)
            .attr("y", (d) => { return y(d[metric]); })
            .attr("height", (d) => {
              return height - y(d[metric]);
            })
            .attr("width", x.rangeBand());

        // text
        group.selectAll(`.bar-chart__value--${metric}`)
            .attr("x", x.rangeBand() / 2)
            .attr("y", (d) => { return y(d[metric]) + 3; })
            .attr("dy", "0.75em")
            .text((d) => { return `${(d[metric] * 100).toFixed()}%`; });

        return selection;
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
