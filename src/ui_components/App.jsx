export default function(React, BarChartCtrl) {
  const App = React.createClass({
    getInitialState() {
      return ({
        location  : "G",
        age_group : "adults",
        sex       : "both",
        start_year : 2011,
        end_year   : 2012
      });
    },
    render() {
      return (
        <BarChartCtrl
          location={this.state.location}
          age_group={this.state.age_group}
          sex={this.state.sex}
          start_year={this.state.start_year}
          end_year={this.state.end_year}
        />
      );
    }
  });

  return App;
};
