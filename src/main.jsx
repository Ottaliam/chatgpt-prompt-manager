import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PromptManager from "./components/PromptManager.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PromptManager />
    {/*<App />*/}
  </StrictMode>,
)
