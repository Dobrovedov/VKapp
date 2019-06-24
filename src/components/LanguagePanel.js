import React, { useState } from "react"
import PropTypes from "prop-types"
import { Panel, PanelHeader, Group, List, Cell } from "@vkontakte/vkui"
import Icon24Done from "@vkontakte/icons/dist/24/done"

const LanguagePanel = ({ language, setAnotherLanguage }) => {
  return (
    <Group>
      <List>
        <Cell
          onClick={() => setAnotherLanguage("ru")}
          asideContent={
            language === "ru" ? <Icon24Done fill="var(--accent)" /> : null
          }
        >
          Русский
        </Cell>
        <Cell
          onClick={() => setAnotherLanguage("it")}
          asideContent={
            language === "it" ? <Icon24Done fill="var(--accent)" /> : null
          }
        >
          Итальянский
        </Cell>
        <Cell
          onClick={() => setAnotherLanguage("en")}
          asideContent={
            language === "en" ? <Icon24Done fill="var(--accent)" /> : null
          }
        >
          Английский
        </Cell>
      </List>
    </Group>
  )
}

LanguagePanel.propTypes = {
  language: PropTypes.string,
  setAnotherLanguage: PropTypes.func,
}

export default LanguagePanel
