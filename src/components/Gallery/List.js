import React, { useCallback } from "react";
import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";
import Gallery from "react-photo-gallery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: "grid",
    "grid-gap": "10px",
    "grid-template-columns": "repeat(auto-fill, minmax(250px,1fr))",
  },
}));

const masonryOptions = {
  transitionDuration: 0,
  itemSelector: ".grid-item",
  gutter: 0,
  isOriginLeft: true,
  horizontalOrder: true,
};

const List = (props) => {
  const { gifs, forwardedRef } = props;

  const imageRenderer = useCallback(({ index, photo }) => {
    const { title, source, date, forwardedRef, ...imgData } = photo;
    const metadata = { title, source, date, url: imgData.src };
    if (index === gifs.length - 1) {
      return (
        <Item
          index={index}
          gif={metadata}
          ref={forwardedRef}
          imgData={imgData}
        />
      );
    }
    return <Item index={index} gif={metadata} imgData={imgData} />;
  });

  const items = gifs.map((gif) => {
    return { ...gif, forwardedRef };
  });

  const gallery = <Gallery photos={items} renderImage={imageRenderer} />;

  return (
    <div>
      {/* <div className="list">{items}</div> */}
      {gallery}
      {/* <div className="masonry-with-columns">{items}</div> */}
      <div
        id="page-bottom-boundary"
        style={{ border: "1px solid red" }}
        // ref={forwardedRef}
      ></div>
    </div>
  );
};

export default React.forwardRef((props, ref) => {
  return <List {...props} forwardedRef={ref} />;
});

// import React from "react";
// import Item from "./Item";
// import { makeStyles } from "@material-ui/core/styles";
// import Masonry from "react-masonry-component";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   grid: {
//     display: "grid",
//     "grid-gap": "10px",
//     "grid-template-columns": "repeat(auto-fill, minmax(250px,1fr))",
//   },
// }));

// const masonryOptions = {
//   transitionDuration: 0,
//   itemSelector: ".grid-item",
//   gutter: 0,
//   isOriginLeft: true,
//   horizontalOrder: true,
// };

// class List extends React.Component {
//   render() {
//     const { gifs, forwardedRef } = this.props;

//     const items = gifs.map((gif, index) => {
//       if (index === gifs.length - 1) {
//         return (
//           <li>
//             {/* <Item
//               key={index}
//               gif={gif}
//               ref={forwardedRef}
//               className="grid-item"
//             /> */}
//             <img src={gif.url} />
//           </li>
//         );
//       }
//       return (
//         <li>
//           {/* <Item key={index} gif={gif} className="grid-item" />; */}
//           <img src={gif.url} />
//         </li>
//       );
//     });

//     const masonry = (
//       <Masonry
//         className="grid-item"
//         elementType={"ul"}
//         options={masonryOptions}
//       >
//         {items}
//       </Masonry>
//     );

//     return (
//       <div>
//         {/* <div className="list">{items}</div> */}
//         {masonry}
//         {/* <div className="masonry-with-columns">{items}</div> */}
//         <div
//           id="page-bottom-boundary"
//           style={{ border: "1px solid red" }}
//           // ref={forwardedRef}
//         ></div>
//       </div>
//     );
//   }
// }

// export default React.forwardRef((props, ref) => {
//   return <List {...props} forwardedRef={ref} />;
// });
