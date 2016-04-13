export default function(React, dataModel, BarChart) {

  const BarChartCtrl = React.createClass({

    getInitialState() {
      return {
        loc_id     : this.props.loc_id,
      };
    },

    componentWillReceiveProps(nextProps) {
      this.setState( { loc_id : nextProps.loc_id } );
    },

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
        output.loc_id     = sub_loc_id;
        output.name       = locationData.name;
        output.type       = locationData.type;

        return output;
      });

      console.log("assembleData:", data);

      data.sort( (a, b) => { return b.overweight - a.overweight; } );

      return data;
    },

    // wraps this.props.zoomIn (checking if location is valid)
    setLocation(target) {
      console.log("setLocationIfValid:", target);
      if (dataModel.hasLocation(target)) {
        console.log("hasLocation: true")
        this.props.zoomIn(target);
      }
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
          setLocation={this.setLocation}
        />
      );
    }
  });

  return BarChartCtrl;
};
