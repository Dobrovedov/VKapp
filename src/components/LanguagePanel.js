import React, { useState } from "react"
import PropTypes from "prop-types"
import { Panel, PanelHeader, Group, List, Cell } from "@vkontakte/vkui"
import Icon24Done from "@vkontakte/icons/dist/24/done"

const LanguagePanel = ({
  language,
  setActivePanel,
  setLanguage,
  prevPanel,
  questionTranslation,
}) => {
  return (
    <Group>
      <List>
        <Cell
          onClick={() => {
            setLanguage("ru")
            questionTranslation("ru")
            setActivePanel(prevPanel)
          }}
          asideContent={
            language === "ru" ? <Icon24Done fill="var(--accent)" /> : null
          }
        >
          Русский
        </Cell>
        <Cell
          onClick={() => {
            setLanguage("it")
            questionTranslation("it")
            setActivePanel(prevPanel)
          }}
          asideContent={
            language === "it" ? <Icon24Done fill="var(--accent)" /> : null
          }
        >
          Итальянский
        </Cell>
        <Cell
          onClick={() => {
            setLanguage("en")
            questionTranslation("en")
            setActivePanel(prevPanel)
          }}
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
  setActivePanel: PropTypes.func,
  setLanguage: PropTypes.func,
  prevPanel: PropTypes.string,
  questionTranslation: PropTypes.func,
}

export default LanguagePanel
