export default function(React) {

  const Selector = React.createClass({
    handleClick(i) {
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
          <p className="selector__label">{this.props.description}</p>
          <div className="selector__button-container">{buttons}</div>
        </div>
      );
    }
  });

  return Selector;
};
