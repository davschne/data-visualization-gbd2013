export default function(React, d3BarChart) {

  const BarChart = React.createClass({
    getInitialState() {
      return {
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
      d3BarChart.create(this.node);
      this.update(this.props);
    },
    componentWillUpdate() {
      this.update(this.props);
    },
    componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    },
    componentWillUnmount() {
      d3BarChart.destroy();
    },
    update(props) {
      d3BarChart.update(this.state.dimensions, props);
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
