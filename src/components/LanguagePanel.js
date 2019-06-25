import React from "react"
import PropTypes from "prop-types"
import { Group, List, Cell } from "@vkontakte/vkui"
import Icon24Done from "@vkontakte/icons/dist/24/done"

const LanguagePanel = ({ language, setAnotherLanguage }) => {
  const languages = [
    ["ru", "Русский"],
    ["en", "English"],
    ["be", "Беларускі"],
    ["bg", "Български"],
    ["cs", "Česky"],
    ["da", "Deens"],
    ["de", "Deutsch"],
    ["el", "ελληνικά"],
    ["es", "español"],
    ["fr", "francais"],
    ["zh", "中国"],
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
            {country[1]}
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
