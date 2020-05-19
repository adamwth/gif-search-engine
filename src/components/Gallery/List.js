import React, { useCallback } from "react";
import Item from "./Item";
import Gallery from "react-photo-gallery";

const List = (props) => {
  const { gifs, forwardedRef } = props;

  const imageRenderer = useCallback(({ index, photo }) => {
    const { title, source, date, forwardedRef, ...imgData } = photo;
    const metadata = { title, source, date, url: imgData.src };
    const margin = "1px";
    if (index === gifs.length - 1) {
      return (
        <Item
          index={index}
          gif={metadata}
          ref={forwardedRef}
          imgData={imgData}
          margin={margin}
        />
      );
    }
    return (
      <Item index={index} gif={metadata} imgData={imgData} margin={margin} />
    );
  });

  const items = gifs.map((gif) => {
    return { ...gif, forwardedRef };
  });

  return (
    <div>
      <Gallery photos={items} renderImage={imageRenderer} />
      <div id="page-bottom-boundary" style={{ border: "1px solid red" }}></div>
    </div>
  );
};

export default React.forwardRef((props, ref) => {
  return <List {...props} forwardedRef={ref} />;
});
