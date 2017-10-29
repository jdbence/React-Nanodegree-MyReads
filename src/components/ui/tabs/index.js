import React, {Children, cloneElement, Component} from 'react';
import {findDOMNode} from 'react-dom'

export class Tab extends Component {
  render(){
    const { children, onClick } = this.props;
    return (
      <button className="tab" onClick={onClick}>
        <div className="tab-inner">
          {children}
        </div>
      </button>
    );
  }
}

export class Tabs extends Component {
  state = {
    size: null
  }
  componentDidMount(){
    const { value } = this.props;
    this.updateSelection(value);
  }
  componentWillReceiveProps(nextProps){
    this.updateSelection(nextProps.value);
  }
  updateSelection = (value) => {
    const child = findDOMNode(this.refs[`tab-${value}`]);
    if(child){
      const rect = child.getBoundingClientRect();
      const size = {width: rect.width, left: rect.left - child.parentNode.offsetLeft};
      this.setState({size});
    }
  }
  render(){
    const { children, onChange } = this.props;
    const { size } = this.state;
    const tabChildren = Children.map(children, (child, i) => {
      return cloneElement(child, {
        ref: `tab-${i}`,
        onClick: onChange ? () => onChange(i) : undefined
      });
    });
    return (
      <div className="tabs">
        {tabChildren}
        {size && <div className="tab-selected" style={size}/>}
      </div>
    );
  }
}

export default Tabs;