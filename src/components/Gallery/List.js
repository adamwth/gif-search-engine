import React, { useCallback } from "react";
import Item from "./Item";
import Gallery from "react-photo-gallery";

const List = (props) => {
  const { gifs, forwardedRef } = props;

  const imageRenderer = useCallback(({ index, photo }) => {
    // NOTE: photo height and width here is different from the one from API call because
    // Gallery modifies it before passing it into this callback
    const margin = "1px";
    if (index === gifs.length - 1) {
      return (
        <Item index={index} image={photo} margin={margin} ref={forwardedRef} />
      );
    }
    return <Item index={index} image={photo} margin={margin} />;
  });

  return (
    <div>
      <Gallery photos={gifs} renderImage={imageRenderer} />
      <div id="page-bottom-boundary" style={{ border: "1px solid red" }}></div>
    </div>
  );
};

export default React.forwardRef((props, ref) => {
  return <List {...props} forwardedRef={ref} />;
});
