export default function(React) {

  const LocLevel = React.createClass({
    handleClick(i) {
      console.log("handleClick:", i);
      this.props.zoomOutToLevel(i);
    },
    render() {

      var levels = ["global", "super region", "region"].slice(0, this.props.level + 1);

      var buttons = levels.map( (level, i) => {
        return (
          <button
            key={i}
            className={`location-level__button location-level__button--${level}`}
            onClick={this.handleClick.bind(this, i)}>
            {level}
          </button>
        );
      });

      return <div className={`location-level`}>{buttons}</div>;
    }
  });

  return LocLevel;
};
