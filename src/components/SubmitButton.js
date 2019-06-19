import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

const SubmitButton = ({ onClick }) => {
  return <Button onClick={onClick}>Сохранить</Button>;
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SubmitButton;
