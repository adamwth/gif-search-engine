import React from "react";
import TransitionsModal from "./Modal";

const Item = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="item">
        <img src={props.gif.url} onClick={handleOpen} />
      </div>
      <TransitionsModal open={open} handleClose={handleClose} gif={props.gif} />
    </>
  );
};

export default Item;
