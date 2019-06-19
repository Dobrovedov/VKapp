import React from 'react';
import PropTypes from 'prop-types';

import { Radio, Div } from '@vkontakte/vkui';

const RadioQuestion = ({
  id,
  title,
  description,
  placeholder,
  mandatory,
  options,
  onChange
}) => {
  return (
    <div>
      <Div>{title}</Div>
      {options.map((option) => (
        <Radio
          name={id}
          description={option}
          onChange={(event) => {
            onChange(option);
          }}
        />
      ))}
    </div>
  );
};

RadioQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  mandatory: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};

export default RadioQuestion;
