/**
 * Code referenced from https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/Masonry.example.js
 * Minor adjustments needed to be made to account for new images passed through props
 */

import React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  WindowScroller,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";
import Item from "./Item";

const columnWidth = (window.innerWidth * 0.9) / 3.5;

const initState = {
  columnWidth: columnWidth,
  height: 1000,
  gutterSize: 2,
  overscanByPixels: 0,
  windowScrollerEnabled: true,
};

const initColumnCount = 0;

class MasonryVirtualized extends React.PureComponent {
  constructor(props) {
    super(props);

    this._columnCount = initColumnCount;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: columnWidth,
      fixedWidth: true,
    });

    this.state = initState;

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _onResize({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  /**
   * Reset masonry if new images were fetched
   * This is meant to be called inside `render()` as only new images will trigger the re-rendering
   * of this entire component. In contrast, window resizing will only trigger the
   * _renderAutoSizer() function, and scrolling will only trigger the _onResize() function.
   */
  resetUponNewImages = () => {
    if (this._masonry !== undefined && this._masonry !== null) {
      this._cache.clearAll();
      this._resetCellPositioner();
      this._masonry.clearCellPositions();
    }
  };

  render() {
    // If no images provided by props, return empty div
    // Hacky fix; without this, sometimes Masonry still runs cellRenderer on empty list,
    // which somehow prevents subsequent renders. Should probably open an issue on react-virtualized.
    if (this.props.images.length === 0) {
      return <div></div>;
    }

    this.resetUponNewImages();

    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    if (windowScrollerEnabled) {
      return (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      );
    } else {
      return this._renderAutoSizer({ height });
    }
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={this.props.images.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
      />
    );
  }

  imageRenderer = (list, index, height, width) => {
    // NOTE: photo height and width here is different from the one from API call because
    // Gallery modifies it before passing it into this callback
    const margin = "1px";
    const photo = list[index];
    const photoScaled = { ...photo, height: height, width: width };
    if (index === list.length - 1) {
      return (
        <Item
          index={index}
          image={photoScaled}
          margin={margin}
          ref={this.props.forwardedRef}
          key={index}
        />
      );
    }
    return (
      <Item index={index} image={photoScaled} margin={margin} key={index} />
    );
  };

  _cellRenderer({ index, key, parent, style }) {
    const list = this.props.images;

    const datum = list[index];
    // const width = this.state.columnWidth;
    const width = style.width;
    const height = (datum.height / datum.width) * width;

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          style={{
            ...style,
            maxHeight: height,
            boxShadow: "0px 0px 1px black",
          }}
          key={index}
        >
          {this.imageRenderer(list, index, height, width)}
        </div>
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === "undefined") {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

export default React.forwardRef((props, ref) => {
  return <MasonryVirtualized {...props} forwardedRef={ref} />;
});
