import React from "react";
import MasonryVirtualized from "./MasonryVirtualized";

const List = React.memo((props) => {
  const { gifs, forwardedRef } = props;

  return (
    <div>
      {/* <Gallery photos={gifs} renderImage={imageRenderer} /> */}
      <MasonryVirtualized images={gifs} ref={forwardedRef} />
      <div id="page-bottom-boundary" style={{ border: "1px solid red" }}></div>
    </div>
  );
});

export default React.forwardRef((props, ref) => {
  return <List {...props} forwardedRef={ref} />;
});
