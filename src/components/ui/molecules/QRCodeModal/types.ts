export type QRCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    link: string;
    labels: {
      fullName: string;
      professionalSummary: string;
    };
  };
};
