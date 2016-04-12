export default function(React, d3BarChart) {

  const BarChart = React.createClass({
    getInitialState() {
      return {
        contents: this.props,
        dimensions: {
          width: 800,
          height: 500
        }
      };
    },
    shouldComponentUpdate() {
      // allow D3 to manage this part of the DOM
      return false;
    },
    componentDidMount() {
      d3BarChart.create(this.node, this.state.dimensions)
        .update(this.state.dimensions, this.state.contents);
    },
    componentWillUpdate() {
      d3BarChart.update(this.node, this.state.contents);
    },
    componentWillUnmount() {
      d3BarChart.destroy();
    },
    render() {
      return (
        <div className="bar-chart__container" ref={(c) => this.node = c}>
        </div>
      );
    }
  });

  return BarChart;
};
