import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import styles from "./PromptManager.module.css";

import PropTypes from 'prop-types';

/**
 * A component for inputting prompts, with a text field and a button
 * to add the entered prompt.
 *
 * @component
 *
 * @param {Object} props - The component's props
 * @param {Function} props.onAddPrompt - Callback function to handle the addition of a new prompt.
 *
 * @returns {React.Component} The rendered component.
 */
const PromptInput = ({ onAddPrompt }) => {
  const [newPrompt, setNewPrompt] = useState("");

  /**
   * Handles the addition of a new prompt by invoking the callback
   * and resetting the input field.
   */
  const handleAddPrompt = () => {
    onAddPrompt(newPrompt);
    setNewPrompt("");
  };

  return (
    <div className={styles.promptRow}>
      <TextField
        size="small"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        placeholder="Add new prompt"
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
      />
      <Button onClick={handleAddPrompt} variant="outlined" disabled={newPrompt.length === 0}>
        <MdAdd />
      </Button>
    </div>
  );
};

PromptInput.propTypes = {
  onAddPrompt: PropTypes.func.isRequired,
};

export default PromptInput;