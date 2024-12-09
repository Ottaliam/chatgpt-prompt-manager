import { useState } from "react";
import { TextField, Button, ButtonGroup, Typography, Box } from "@mui/material";
import { MdOutlineSave, MdCancel, MdContentCopy, MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import styles from "./PromptManager.module.css";

import PropTypes from 'prop-types';

const PromptItem = ({ prompt, index, onEdit, onDelete, onCopy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(prompt);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(index, editingPrompt);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditingPrompt(prompt);
  };

  return (
    <li>
      {isEditing ? (
        <div className={styles.promptRow}>
          <TextField
            size="small"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            value={editingPrompt}
            onChange={(e) => setEditingPrompt(e.target.value)}
          />
          <ButtonGroup variant="outlined">
            <Button onClick={handleSaveClick}>
              <MdOutlineSave />
            </Button>
            <Button onClick={handleCancelClick}>
              <MdCancel />
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <div className={styles.promptRow}>
          <Box sx={{ overflowY: "auto", maxHeight: "100px", width: "100%", padding: "8.5px 14px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#f9f9f9" }}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{prompt}</Typography>
          </Box>
          <ButtonGroup variant="outlined">
            <Button onClick={() => onCopy(prompt)}>
              <MdContentCopy />
            </Button>
            <Button onClick={handleEditClick}>
              <MdOutlineModeEditOutline />
            </Button>
            <Button onClick={() => onDelete(index)}>
              <MdDelete />
            </Button>
          </ButtonGroup>
        </div>
      )}
    </li>
  );
};

PromptItem.propTypes = {
  prompt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default PromptItem;