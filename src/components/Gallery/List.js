import React from "react";
import MasonryVirtualized from "./MasonryVirtualized";

/**
 * Wrapper for gifs display layout
 * Currently uses a virtualized masonry layout
 */
const List = React.memo((props) => {
  const { gifs, forwardedRef } = props;

  return (
    <div>
      <MasonryVirtualized images={gifs} ref={forwardedRef} />
      <div id="page-bottom-boundary" style={{ border: "1px solid red" }}></div>
    </div>
  );
});

export default React.forwardRef((props, ref) => {
  return <List {...props} forwardedRef={ref} />;
});
