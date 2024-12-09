import { useState } from "react";
import { TextField, Button, ButtonGroup, Typography, Box } from "@mui/material";
import { MdOutlineSave, MdCancel, MdContentCopy, MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import styles from "./PromptManager.module.css";

import PropTypes from 'prop-types';

/**
 * Represents an item in the PromptList.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.prompt - The prompt text to display and edit.
 * @param {number} props.index - The index of the prompt in the list.
 * @param {Function} props.onEdit - Callback to handle the editing of a prompt.
 * @param {Function} props.onDelete - Callback to handle deletion of a prompt.
 * @param {Function} props.onCopy - Callback to handle copying of a prompt.
 *
 * @returns {React.Component} The rendered component.
 */
const PromptItem = ({ prompt, index, onEdit, onDelete, onCopy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(prompt);

  /**
   * Enables edit mode.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Saves changes and exits edit mode.
   */
  const handleSaveClick = () => {
    onEdit(index, editingPrompt);
    setIsEditing(false);
  };

  /**
   * Cancels editing, discards changes and exits edit mode.
   */
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