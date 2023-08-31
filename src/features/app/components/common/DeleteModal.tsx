import {FC, ReactComponentElement, useState} from 'react';
import {Input, Modal, Text, useModal} from '@geist-ui/core';

export type DeleteModalProps = {
  modalInstance: ReturnType<typeof useModal>;
  title: string;
  description: ReactComponentElement<any>;
  deleteButtonText?: string;
  keyword?: string;
  disabled?: boolean;
  onDelete?(): void;
};

const DeleteModal: FC<DeleteModalProps> = ({
  modalInstance,
  title,
  description,
  deleteButtonText = 'Delete',
  // When `keyword` is provided the delete modal will require the user to type
  // in that keyword before we will allow them to trigger the delete action.
  keyword = '',
  disabled,
  onDelete = () => {}
}) => {
  const {setVisible, bindings} = modalInstance;
  const [keywordInput, setKeywordInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const isDisabled =
    disabled || isDeleting || keyword?.toLowerCase().trim() !== keywordInput.toLowerCase().trim();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.();
      setKeywordInput('');
      setVisible(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal {...bindings}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        <Text>{description}</Text>
        {keyword && (
          <Input
            name="keyword_input"
            scale={1.5}
            width="100%"
            value={keywordInput}
            onChange={(event) => setKeywordInput(event.target.value)}
          />
        )}
      </Modal.Content>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action
        onClick={handleDelete}
        loading={isDeleting}
        disabled={isDisabled}
        {...(isDisabled && {style: {cursor: 'not-allowed'}})}
      >
        {deleteButtonText}
      </Modal.Action>
    </Modal>
  );
};

export default DeleteModal;
