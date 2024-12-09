import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PromptPopupButton from "./components/PromptPopupButton.jsx";

/**
 * @const {function}
 * Appends a new root DOM element with a React component to the specified target element.
 * If a target element with the class '.gap-x-1' is found, it creates a new div element
 * with the id 'crx-root', appends it to the target, and renders the `PromptPopupButton`
 * React component inside it. Once the element is appended, the MutationObserver is disconnected.
 */
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

/**
 * @const {MutationObserver}
 * Mutation Observer to monitor changes in the DOM.
 * Calls `appendRootToTarget` when an element with class '.gap-x-1' is added,
 * and a root element with id '#crx-root' does not exist.
 */
const observer = new MutationObserver(mutations => {
  mutations.forEach(() => {
    if (document.querySelector('.gap-x-1') && !document.querySelector('#crx-root')) {
      appendRootToTarget();
    }
  });
});

// Start observing the document body for added or removed child elements and subtree modifications.
observer.observe(document.body, {
  childList: true,
  subtree: true
});