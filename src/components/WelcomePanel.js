import React from "react"
import PropTypes from "prop-types"
import { Div, Button } from "@vkontakte/vkui"

const WelcomePanel = ({ title, company, description, onClick }) => {
  return (
    <Div
      className="WelcomePage"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: "20vh",
        paddingRight: 30,
        paddingLeft: 30,
        textAlign: "center",
        color: "white",
      }}
    >
      <Div style={{ fontSize: "1.5em", marginBottom: 20 }}>
        {title}
        {company && <Div style={{ fontSize: "0.4em" }}>by {company}</Div>}
      </Div>
      <Div
        style={{
          fontSize: "0.8em",
          maxHeight: "25vh",
          marginBottom: 20,
          overflow: "auto",
        }}
      >
        {description}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
        assumenda, aut cupiditate deserunt, dolorem dolorum earum eos facilis
        impedit incidunt inventore odio perspiciatis quia repudiandae sint ut,
        voluptas. Aliquam at atque, cum dignissimos, esse fuga fugit impedit
        inventore nam nemo nisi porro quisquam ratione rerum sapiente sequi, sit
        voluptates! Accusantium ad adipisci culpa deleniti eos error, est et
        itaque, molestias nemo non nostrum omnis possimus similique sint sunt,
        ullam. Aliquam architecto, blanditiis eaque facere fugit, hic id in iure
        laborum nam possimus quaerat quia quibusdam rem ullam vel vero. Ad eum
        molestias quia sed! Assumenda cupiditate deserunt eaque excepturi, illo
        illum, in, ipsa iusto labore molestias neque nobis nostrum praesentium
        provident quae rerum voluptatibus. Alias aliquid aspernatur blanditiis
        consequatur debitis deserunt dicta dolorem, dolores doloribus eos error
        eveniet fuga impedit iste iusto labore laudantium maiores maxime minus
        molestiae mollitia non obcaecati odit officia praesentium quos ratione
        reiciendis, sapiente sint suscipit tempore temporibus ullam velit!
        Consequuntur cum fuga laborum natus porro quidem similique sint vel.
        Aperiam aspernatur consectetur cum deserunt ipsa ipsum nulla quo sit
        soluta temporibus? Amet, rerum, tempore. Ab amet aut, autem cupiditate
        delectus eos eum excepturi facilis hic illum iusto magni mollitia nisi
        perferendis, quis quod ut voluptatibus.
      </Div>
      <Div>
        <Button
          size="l"
          style={{
            background: "none",
            border: "2px solid white",
            color: "white",
          }}
          stretched
          onClick={onClick}
        >
          Начать
        </Button>
      </Div>
    </Div>
  )
}

WelcomePanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
}

export default WelcomePanel
