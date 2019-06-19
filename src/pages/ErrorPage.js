import React from 'react';
import { View, Panel, Button, PanelHeader, Div } from '@vkontakte/vkui';

const ErrorPage = () => {
  return (
    <View>
      <Panel>
        <PanelHeader>404</PanelHeader>
        <Div
          style={{
            paddingTop: 30,
            paddingBottom: 60,
            color: 'gray',
            textAlign: 'center'
          }}
        >
          <h2>404 Page Not Found</h2>
          <br />
          <p>Упс… Мы не можем найти то, что Вы ищете</p>
        </Div>
      </Panel>
    </View>
  );
};

export default ErrorPage;
