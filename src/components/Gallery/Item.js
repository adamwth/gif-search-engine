import React from "react";
import TransitionsModal from "./Modal";

// Item is a class because we are using refs to get the underlying DOM object (refer to List.js)
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { image, forwardedRef, margin } = this.props;
    const { height, width, src, title } = image;
    const divStyle = {
      height: height,
      width: width,
      margin: margin,
    };
    const imgData = { height, width, src };
    return (
      <>
        <div ref={forwardedRef} style={divStyle}>
          <img {...imgData} alt={title} onClick={this.handleOpen} />
        </div>
        <TransitionsModal
          open={this.state.open}
          handleClose={this.handleClose}
          data={image}
        />
      </>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <Item {...props} forwardedRef={ref} />;
});
