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
            className={`selector__button selector__button--${this.props.type}`}
            onClick={this.handleClick.bind(this, i)}>
            {option.label}
          </button>
        );
      });

      return (
        <div className={`selector selector--${this.props.type}`}>
          {buttons}
        </div>
      );
    }
  });

  return Selector;
};
