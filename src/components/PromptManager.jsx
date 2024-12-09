import { useState} from "react";
import { Snackbar } from "@mui/material";

import PromptInput from "./PromptInput.jsx";
import PromptList from "./PromptList.jsx";

/**
 * Display and manage a list of prompts,
 * enabling addition, editing, removal, and copying of prompt entries.
 *
 * @component
 *
 * @returns {React.Component} - The rendered component.
 */
const PromptManager = () => {
  const [promptsList, setPromptsList] = useState(JSON.parse(localStorage.getItem("cpm.prompts")) || ["test1", "test2"]);
  const [snackOpen, setSnackOpen] = useState(false);

  /**
   * Adds a new prompt to the `promptsList` and updates `localStorage`.
   *
   * @param {string} newPrompt - The new prompt to add.
   */
  const addPrompt = (newPrompt) => {
    if (newPrompt.length > 0) {
      const updatedPromptsList = [...promptsList, newPrompt];
      setPromptsList(updatedPromptsList);
      localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
    }
  };

  /**
   * Edits an existing prompt in the `promptsList` and updates `localStorage`.
   *
   * @param {number} index - The index of the prompt to edit.
   * @param {string} editedPrompt - The new value for the prompt.
   */
  const editPrompt = (index, editedPrompt) => {
    const updatedPromptsList = promptsList.map((prompt, promptIndex) =>
      promptIndex === index ? editedPrompt : prompt
    );
    setPromptsList(updatedPromptsList);
    localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
  };

  /**
   * Removes a prompt from the prompts list and updates `localStorage`.
   *
   * @param {number} index - The index of the prompt to remove.
   */
  const removePrompt = (index) => {
    const updatedPromptsList = promptsList.filter((prompt, promptIndex) => promptIndex !== index);
    setPromptsList(updatedPromptsList);
    localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
  };

  /**
   * Copies a prompt to the clipboard and shows a Snackbar notification.
   *
   * @param {string} prompt - The prompt text to copy.
   */
  const copyToClipboard = (prompt) => {
    navigator.clipboard.writeText(prompt);
    setSnackOpen(true);
  };

  return (
    <div>
      <PromptInput onAddPrompt={addPrompt} />
      <PromptList promptsList={promptsList} onEdit={editPrompt} onDelete={removePrompt} onCopy={copyToClipboard} />

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Copied to clipboard!"
      />
    </div>
  );
};

export default PromptManager;