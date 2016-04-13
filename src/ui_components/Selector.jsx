export default function(React) {

  const Selector = React.createClass({
    handleClick(i) {
      console.log("handleClick:", this.props.options[i]);
      this.props.options[i].fn();
    },
    render() {

      var buttons = this.props.options.map( (option, i) => {
        return (
          <button
            key={i}
            className={`selector__button`}
            onClick={this.handleClick.bind(this, i)}>
            {option.label}
          </button>
        );
      });

      return <div className={`selector`}>{buttons}</div>;
    }
  });

  return Selector;
}
