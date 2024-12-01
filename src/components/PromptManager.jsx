import {useState} from "react";
import {Box, Button, ButtonGroup, TextField, Typography} from "@mui/material";
import { MdOutlineModeEditOutline, MdDelete, MdAdd, MdOutlineSave, MdCancel } from "react-icons/md";

import styles from "./PromptManager.module.css";

const PromptManager = () => {
  const [promptsList, setPromptsList] = useState(JSON.parse(localStorage.getItem("cpm.prompts")) || ["test1", "test2"]);
  const [newPrompt, setNewPrompt] = useState("");
  const [editingPromptIndex, setEditingPromptIndex] = useState(null);
  const [editingPrompt, setEditingPrompt] = useState("");

  const addPrompt = () => {
    if (newPrompt.length > 0) {
      const updatedPromptsList = [...promptsList, newPrompt];
      setPromptsList(updatedPromptsList);
      localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
      setNewPrompt("");
    }
  };

  const removePrompt = (index) => {
    setPromptsList(promptsList.filter((prompt, promptIndex) => promptIndex !== index));
  };

  const startEditingPrompt = (index) => {
    setEditingPromptIndex(index);
    setEditingPrompt(promptsList[index]);
  }

  const saveEditingPrompt = () => {
    const updatedPromptsList = promptsList.map((prompt, promptIndex) =>
      promptIndex === editingPromptIndex ? editingPrompt : prompt
    );
    setPromptsList(updatedPromptsList);
    localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
    setEditingPromptIndex(null);
    setEditingPrompt("");
  }

  const cancelEditingPrompt = () => {
    setEditingPromptIndex(null);
    setEditingPrompt("");
  }

  return (
    <div>
      {/* Add new prompt */}
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
        <Button onClick={addPrompt} variant="outlined" disabled={newPrompt.length === 0}>
          <MdAdd />
        </Button>
      </div>

      {/* Display list of prompts */}
      <ul className={styles.promptList}>
        {promptsList.map((prompt, index) => (
          <li key={index}>
            {editingPromptIndex === index ? (
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
                  <Button onClick={saveEditingPrompt}>
                    <MdOutlineSave />
                  </Button>
                  <Button onClick={cancelEditingPrompt}>
                    <MdCancel />
                  </Button>
                </ButtonGroup>
              </div>
            ) : (
              <div className={styles.promptRow}>
                <Box
                  sx={{
                    overflowY: "auto",
                    maxHeight: "100px",
                    width: "100%",
                    padding: "8.5px 14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word"
                    }}
                  >
                    {prompt}
                  </Typography>
                </Box>
                <ButtonGroup variant="outlined">
                  <Button onClick={() => startEditingPrompt(index)}>
                    <MdOutlineModeEditOutline />
                  </Button>
                  <Button onClick={() => removePrompt(index)}>
                    <MdDelete />
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptManager;