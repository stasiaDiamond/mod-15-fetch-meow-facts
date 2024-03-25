class OnClickElements extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this); // Binding handleClick to the class instance
  }

  handleClick(event) {
    alert(`hey! you clicked: ${event.target.id}`);
  }

  render() {
    return (
      <div className="container-div">
        <div id="div-element" onClick={this.handleClick}>I am DIV</div>

        <span id="span-element" onClick={this.handleClick}>I am SPAN</span>
        <br/>

        <button id="button-element" onClick={this.handleClick}>I am Button</button>
        <br/>

        <a id="link-element" href="#" onClick={this.handleClick}>I am LINK</a>

        <div id="div-element-2" className="button" onClick={this.handleClick}>I am DIV</div>

        <span id="span-element-2" className="button" onClick={this.handleClick}>I am SPAN</span>
        <br/>

        <button id="button-element-2" className="button" onClick={this.handleClick}>I am Button</button>
        <br/>

        <a id="link-element-2" className="button" href="#" onClick={this.handleClick}>I am LINK</a>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(OnClickElements),
  document.getElementById('root')
);
