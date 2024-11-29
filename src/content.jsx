import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PromptPopupButton from "./components/PromptPopupButton.jsx";

const appendRootToTarget = () => {
  const targetElement = document.querySelector('.gap-x-1');

  if (targetElement) {
    const root = document.createElement("div");
    root.id = "crx-root";
    targetElement.appendChild(root);

    createRoot(root).render(
      <StrictMode>
        <PromptPopupButton />
      </StrictMode>
    );

    observer.disconnect();
  }
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(() => {
    if (document.querySelector('.gap-x-1') && !document.querySelector('#crx-root')) {
      appendRootToTarget();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});