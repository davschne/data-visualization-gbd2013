export default function(React, BarChartCtrl, Selector, LocLevel) {
  const App = React.createClass({
    getInitialState() {
      return ({
        loc_id       : "G",
        age_group    : "adults",
        sex          : "both",
        start_year   : 2011,
        end_year     : 2012,
        loc_ancestry : ["G"] // stack for tracking position in the tree
      });
    },
    zoomIn(target_loc) {
      var ancestry = this.state.loc_ancestry.slice();
      ancestry.push(target_loc)
      this.setState({
        loc_id: target_loc,
        // add current location to the stack
        loc_ancestry: ancestry
      });
    },
    zoomOutToLevel(level) {
      // level 0 is zoomed out all the way (i.e. Global)
      if (level > this.state.loc_ancestry.length - 1) return;
      var target_loc = this.state.loc_ancestry[level];
      var ancestry   = this.state.loc_ancestry.slice(0, level + 1);
      this.setState({
        loc_id: target_loc,
        // remove current location from the stack
        loc_ancestry: ancestry
      });
    },

    render() {

      var age_group_options = ["children", "adults"].map( (label) => {
        return {
          label: label,
          fn: () => { this.setState({ age_group: label }); }
        };
      });

      var sex_options = ["female", "both", "male"].map( (label) => {
        return {
          label: label,
          fn: () => { this.setState({ sex: label }); }
        }
      });

      return (
        <div className="app__container">
          <BarChartCtrl
            loc_id={this.state.loc_id}
            age_group={this.state.age_group}
            sex={this.state.sex}
            start_year={this.state.start_year}
            end_year={this.state.end_year}
            zoomIn={this.zoomIn}
          />
          <div className="controls">
            <Selector
              type="age-group"
              description="age group"
              current={this.state.age_group}
              options={age_group_options}
            />
            <Selector
              type="sex"
              description="sex"
              current={this.state.sex}
              options={sex_options}
            />
            <LocLevel
              level={this.state.loc_ancestry.length - 1}
              zoomOutToLevel={this.zoomOutToLevel}
            />
          </div>
        </div>
      );
    }
  });

  return App;
};
