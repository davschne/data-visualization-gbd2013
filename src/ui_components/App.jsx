export default function(React, BarChartCtrl) {
  const App = React.createClass({
    getInitialState() {
      return ({
        loc_id     : "G",
        age_group  : "adults",
        sex        : "both",
        start_year : 2011,
        end_year   : 2012
      });
    },
    setLocation: function(loc_id) {
      console.log("setLocation:", loc_id)
      this.setState( { loc_id: loc_id } );
    },
    render() {
      return (
        <BarChartCtrl
          loc_id={this.state.loc_id}
          age_group={this.state.age_group}
          sex={this.state.sex}
          start_year={this.state.start_year}
          end_year={this.state.end_year}
          setLocation={this.setLocation}
        />
      );
    }
  });

  return App;
};
