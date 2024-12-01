import { useState } from "react";
import { Popover } from "@mui/material";
import { TbPrompt } from "react-icons/tb";

import styles from "./PromptPopupButton.module.css";
import PromptManager from "./PromptManager.jsx";

const PromptPopupButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
        <PromptManager />
      </Popover>
    </div>
  );
};

export default PromptPopupButton;