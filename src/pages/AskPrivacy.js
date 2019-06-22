import React from "react"
import PropTypes from "prop-types"

import { View, Panel, Button, Cell, Div } from "@vkontakte/vkui"

import mockConnect from "@vkontakte/vkui-connect"

const AskPrivacy = ({ onPrivate, onPublic }) => {
  return (
    <View>
      <Panel>
        <div style={{ paddingTop: "30vh" }}>
          <Cell multiline style={{ textAlign: "center", fontSize: 32 }}>
            Даете ли вы согласие на обработку персональных данных?
          </Cell>
          <Div style={{ display: "flex" }}>
            <Button
              stretched
              onClick={onPublic}
              size="l"
              style={{ marginRight: 5 }}
            >
              Да
            </Button>
            <Button
              stretched
              onClick={onPrivate}
              size="l"
              style={{ marginLeft: 5 }}
            >
              Нет
            </Button>
          </Div>
        </div>
      </Panel>
    </View>
  )
}

AskPrivacy.propTypes = {
  onPrivate: PropTypes.func,
  onPublic: PropTypes.func,
}

export default AskPrivacy
