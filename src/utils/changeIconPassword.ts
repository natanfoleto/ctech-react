const changeIconPassword = (isOpen: boolean): string => {
  if (isOpen) {
    return 'password';
  }
  return 'text';
};

export default changeIconPassword;
