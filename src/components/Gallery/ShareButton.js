import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import Popover from "@material-ui/core/Popover";

import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const useStyles = makeStyles(() => ({
  popover: {
    background: "transparent",
  },
  share: {
    margin: "10px",
  },
}));

const ShareButton = (props) => {
  // Share button functions
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { url } = props;
  const classes = useStyles();
  return (
    <div>
      <IconButton aria-label="share" onClick={handleClick}>
        <ShareIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div>
          <FacebookShareButton url={url}>
            <FacebookIcon className={classes.popover} size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <RedditShareButton url={url}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </div>
      </Popover>
    </div>
  );
};

export default ShareButton;
