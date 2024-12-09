import { useState } from "react";
import {Box, Popover} from "@mui/material";
import { TbPrompt } from "react-icons/tb";

import styles from "./PromptPopupButton.module.css";
import PromptManager from "./PromptManager.jsx";

/**
 * A button with a popover.
 * The popover contains the `PromptManager` component.
 *
 * @component
 *
 * @returns {React.Component} - The rendered component.
 */
const PromptPopupButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Event handler for opening the popover.
   * It sets the clicked element as the anchor element for the popover.
   *
   * @param {Object} event - The click event object.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Event handler for closing the popover.
   * It sets the anchor element to null.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * @const {boolean}
   * Controls whether the popover is open or not.
   */
  const open = Boolean(anchorEl);

  /**
   * @const {string}
   * The id of the opened popover.
   * If the popover is not open, set to `undefined`.
   */
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.promptPopupButton}>
      <TbPrompt size={32} aria-describedby={id} variant="contained" onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            p: 2,
            width: "600px",
          }}>
          <PromptManager />
        </Box>
      </Popover>
    </div>
  );
};

export default PromptPopupButton;