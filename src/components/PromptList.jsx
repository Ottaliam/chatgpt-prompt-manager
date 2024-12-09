import PromptItem from "./PromptItem";
import PropTypes from 'prop-types';
import styles from "./PromptManager.module.css";

/**
 * A component that renders a list of prompts in a styled unordered list.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.promptsList - An array of prompts to be displayed.
 * @param {Function} props.onEdit - Callback to handle the editing of a prompt.
 * @param {Function} props.onDelete - Callback to handle deletion of a prompt.
 * @param {Function} props.onCopy - Callback to handle copying of a prompt.
 *
 * @returns {React.Component} The rendered component.
 */
const PromptList = ({ promptsList, onEdit, onDelete, onCopy }) => {
  return (
    <ul className={styles.promptList}>
      {promptsList.map((prompt, index) => (
        <PromptItem
          key={index}
          prompt={prompt}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </ul>
  );
};

PromptList.propTypes = {
  promptsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default PromptList;