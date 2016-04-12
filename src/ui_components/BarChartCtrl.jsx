export default function(React, dataModel, BarChart) {

  const BarChartCtrl = React.createClass({
    getInitialState() {
      return ({ location : this.getLocationData(this.props.location) });
    },
    getLocationData(location) {
      return dataModel.getLocationData(location);
    },
    assembleData() {
      var contains = this.state.location.contains;
      var data = contains.map((location) => {
        var output = dataModel.getMean({
          location: location,
          age_group: this.props.age_group,
          sex: this.props.sex,
          start_year: this.props.start_year,
          end_year: this.props.end_year
        });
        var locationData = this.getLocationData(location);
        output.name = locationData.name;
        output.type = locationData.type;
        return output;
      });
      console.log("data:", data)
      return data;
    },
    render() {

      // call the data model here to construct the data structure passed to BarChart
      var data = this.assembleData();

      return (
        <BarChart name={this.state.location.name}
          type={this.state.location.type}
          data={data}
        />
      );
    }
  });

  return BarChartCtrl;
};
