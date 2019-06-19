import React, { useState } from 'react';

import { View, Panel, PanelHeader, Div } from '@vkontakte/vkui';
import ErrorPage from '../pages/ErrorPage';
import NextButton from '../components/NextButton';
import SubmitButton from '../components/SubmitButton';
import BackButton from '../components/BackButton';

const mockPoolList = [
  {
    id: '12XJWWr-Z8gkRdxrkwoU8CYg1h8GqWv3OJh-AOLzpyyQ',

    title: 'Заголовок опроса',
    description: 'Описание опроса',
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

  if (!poolData) {
    return <ErrorPage />;
  }

  const totalQuestionsNumber = poolData.questions.length - 1;

  return (
    <View activePanel={activePanel}>
      {[
        ...poolData.questions.map((question, index) => (
          <Panel id={index}>
            <PanelHeader>{poolData.title}</PanelHeader>

            <Div>{question.title}</Div>

            {activePanel > 0 && (
              <BackButton onClick={() => setActivePanel(activePanel - 1)} />
            )}
            {activePanel < totalQuestionsNumber ? (
              <NextButton onClick={() => setActivePanel(activePanel + 1)} />
            ) : (
              <SubmitButton
                onClick={() => {
                  setActivePanel('confirmation');
                }}
              />
            )}
          </Panel>
        )),
        <Panel id="confirmation">
          <Div
            style={{
              paddingTop: 30,
              paddingBottom: 60,
              color: 'gray',
              textAlign: 'center'
            }}
          >
            <h2>Опрос завершен</h2>
            <br />
            <p>{poolData.confirmationMessage}</p>
          </Div>
        </Panel>
      ]}
    </View>
  );
};

export default PoolPage;
