import React, { useState, useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import Cookies from "js-cookie";
import Consent from "./Components/Consent";
import Spinner from "./Components/Spinner";
import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const cookie = "acceptCookieReroute";

const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};
ReactPixel.init(process.env.REACT_APP_PIXEL_ID!, undefined, options);

if (!Cookies.get(cookie)) {
  ReactPixel.revokeConsent();
}

ReactPixel.pageView();

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function App() {

  const [granted, setGranted] = useState(false);

  useEffect(() => {
    //addHelper();
  }, [granted]);

  console.log(granted);
  function determineCookie() {
    if (!Cookies.get(cookie)) {
      return (
        <Consent
          openInNewTab={openInNewTab}
          cookieName={cookie}
          setGranted={setGranted}
        />
      );
    } else {
      ReactPixel.grantConsent();
    }
  }

  function addHelper() {
    if (Cookies.get(cookie)) {
      return (
        <img
          id="helper"
          src="https://www.facebook.com/tr/"
          alt=""
          onLoad={() => {
            setTimeout(() => {
              window.location.replace("https://comeuntochrist.org");
            });
          }}
        />
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {determineCookie()}
        <Spinner className="spinner" />
        <p>
          Loading... (If the page hasn't loaded in 3 seconds, click{" "}
          <a
            href="/#"
            onClick={() => {
              console.log(`Continuing`);
              ReactPixel.grantConsent();
              window.location.replace("https://comeuntochrist.org");
            }}
          >
            here
          </a>
          )
        </p>
        {addHelper()}
      </header>
    </div>
  );
}

export default App;