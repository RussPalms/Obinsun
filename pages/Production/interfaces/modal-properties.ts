import React from 'react';
export default interface ModalProperties {
  title: string;
  description: string;
  onButtonClick: (event: React.MouseEvent) => void;
}
