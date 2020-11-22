import React from "react";
import ReactPixel from "react-facebook-pixel";
import Consent from "./Components/Consent";
import Spinner from "./Components/Spinner";
import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};
ReactPixel.init("847587105990799", undefined, options);
ReactPixel.revokeConsent();
ReactPixel.pageView();

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Consent openInNewTab={openInNewTab} />
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
      </header>
    </div>
  );
}

export default App;
