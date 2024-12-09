import PromptItem from "./PromptItem";
import PropTypes from 'prop-types';
import styles from "./PromptManager.module.css";

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