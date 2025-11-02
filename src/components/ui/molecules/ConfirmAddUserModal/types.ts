export type ConfirmAddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userId: string;
  userName?: string;
  isLoading?: boolean;
};



