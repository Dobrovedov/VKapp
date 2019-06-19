import React, { useState } from 'react';

import { View, Panel, Button } from '@vkontakte/vkui';

const mockPoolList = [
  {
    id: '12XJWWr-Z8gkRdxrkwoU8CYg1h8GqWv3OJh-AOLzpyyQ',

    title: 'Fun information',
    description: '',
    companyId: '',
    editorEmails: ['stevenschmatz@gmail.com'],
    confirmationMessage: 'Thanks for submitting your contact info!',

    questions: [
      {
        type: 'TEXTAREA',
        helpText: '',
        placeholder: '',
        title: 'Name',
        id: 1633920210,
        isRequired: false
      },
      {
        type: 'MULTIPLE_CHOICE',
        helpText: '',
        id: 1770822543,
        title: 'How much do you like choices?',
        isRequired: false,
        hasOtherOption: true,
        placeholder: '',
        options: ['Option 1', 'Option 2']
      },
      {
        type: 'CHECKBOX',
        helpText: '',
        id: 1846923513,
        title: 'How much do you like checkboxes?',
        isRequired: false,
        hasOtherOption: true,
        placeholder: '',
        options: ['Option 1 Check', 'Option 2 Check']
      },
      {
        type: 'DROPDOWN',
        helpText: '',
        id: 449887830,
        title: 'How much do you like dropdowns?',
        isRequired: false,
        placeholder: '',
        options: ['Option 1 Dropdown', 'Option 2 Dropdown', 'Option 3 Dropdown']
      }
    ]
  }
];

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1);
  const poolData = mockPoolList.filter((pool) => pool.id === poolId)[0];

  const [activePanel, setActivePanel] = useState(0);

  return (
    <View activePanel={activePanel}>
      {poolData.questions.map((question, index) => (
        <Panel id={index}>
          Question {index}
          <Button onClick={() => setActivePanel(activePanel + 1)}>Далее</Button>
        </Panel>
      ))}
    </View>
  );
};

export default PoolPage;
