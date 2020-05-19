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
    const { gif, imgData, forwardedRef } = this.props;
    return (
      <>
        <div
          className="item"
          ref={forwardedRef}
          width={imgData.width}
          height={imgData.height}
        >
          <img {...imgData} onClick={this.handleOpen} />
        </div>
        <TransitionsModal
          open={this.state.open}
          handleClose={this.handleClose}
          gif={gif}
        />
      </>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <Item {...props} forwardedRef={ref} />;
});
