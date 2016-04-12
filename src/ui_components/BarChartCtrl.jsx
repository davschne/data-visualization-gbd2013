export default function(React, dataModel, BarChart) {

  const BarChartCtrl = React.createClass({

    assembleData(location) {

      var data = location.contains.map((sub_loc_id) => {
        var output = dataModel.getMean({
          loc_id: sub_loc_id,
          age_group: this.props.age_group,
          sex: this.props.sex,
          start_year: this.props.start_year,
          end_year: this.props.end_year
        });
        var locationData = dataModel.getLocationData(sub_loc_id);
        output.loc_id = sub_loc_id;
        output.name   = locationData.name;
        output.type   = locationData.type;
        return output;
      });
      data.sort( (a, b) => { return b.overweight - a.overweight; } );

      return data;
    },

    render() {

      var location = dataModel.getLocationData(this.props.loc_id);
      var data = this.assembleData(location);

      return (
        <BarChart
          loc_id={this.props.loc_id}
          name={location.name}
          type={location.type}
          data={data}
          setLocation={this.props.setLocation}
        />
      );
    }
  });

  return BarChartCtrl;
};
