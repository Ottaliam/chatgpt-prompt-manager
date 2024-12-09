import { useState} from "react";
import { Snackbar } from "@mui/material";

import PromptInput from "./PromptInput.jsx";
import PromptList from "./PromptList.jsx";

const PromptManager = () => {
  const [promptsList, setPromptsList] = useState(JSON.parse(localStorage.getItem("cpm.prompts")) || ["test1", "test2"]);
  const [snackOpen, setSnackOpen] = useState(false);

  const addPrompt = (newPrompt) => {
    if (newPrompt.length > 0) {
      const updatedPromptsList = [...promptsList, newPrompt];
      setPromptsList(updatedPromptsList);
      localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
    }
  };

  const editPrompt = (index, editedPrompt) => {
    const updatedPromptsList = promptsList.map((prompt, promptIndex) =>
      promptIndex === index ? editedPrompt : prompt
    );
    setPromptsList(updatedPromptsList);
    localStorage.setItem("cpm.prompts", JSON.stringify(updatedPromptsList));
  };

  const removePrompt = (index) => {
    setPromptsList(promptsList.filter((prompt, promptIndex) => promptIndex !== index));
  };

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