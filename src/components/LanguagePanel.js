import React, { useState } from "react"
import PropTypes from "prop-types"
import { Panel, PanelHeader, Group, List, Cell } from "@vkontakte/vkui"
import Icon24Done from "@vkontakte/icons/dist/24/done"
import { translate } from "../translator"

const LanguagePanel = ({ language, setAnotherLanguage }) => {
  const languages = [
    ["ru", "Русский"],
    ["en", "Английский"],
    ["be", "Белорусский"],
    ["bg", "Болгарский"],
    ["cs", "Чешский"],
    ["da", "Датский"],
    ["de", "Немецкий"],
    ["el", "Греческий"],
    ["es", "Испанский"],
    ["fr", "Французский"],
    ["zh", "Китайский"],
  ]
  return (
    <Group>
      <List>
        {languages.map((country) => (
          <Cell
            onClick={() => setAnotherLanguage(country[0])}
            asideContent={
              language === country[0] ? (
                <Icon24Done fill="var(--accent)" />
              ) : null
            }
          >
            {translate(country[1], language)}
          </Cell>
        ))}
      </List>
    </Group>
  )
}

LanguagePanel.propTypes = {
  language: PropTypes.string,
  setAnotherLanguage: PropTypes.func,
}

export default LanguagePanel
