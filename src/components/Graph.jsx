export default function(React) {

  const Graph = React.createClass({
    render() {
      return (
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.type}</p>
        </div>
      );
    }
  });

  return Graph;
};
