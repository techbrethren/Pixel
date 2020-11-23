import React from "react";
import Alert from "react-bootstrap/Alert";
import CookieConsent from "react-cookie-consent";
import ReactPixel from "react-facebook-pixel";
import "../Styles/Consents.css";

interface ConsentTypes {
  openInNewTab(url: string): any;
  setGranted(allowed: boolean): any;
  cookieName: string;
}

export default function Consent({
  openInNewTab,
  setGranted,
  cookieName,
}: ConsentTypes) {
  return (
    <div className="Popup">
      <CookieConsent
        disableStyles={true}
        location="top"
        onAccept={() => {
          ReactPixel.grantConsent();
          setGranted(true);
        }}
        cookieName={cookieName}
        overlay
        buttonClasses="btn btn-primary text-capitalize"
        containerClasses="alert alert-warning col-lg-12"
        contentClasses="text-capitalize"
      >
        This website uses cookies to enhance the user experience.
        <br />
        Continued usage of this site implies permission to store cookies.
        <br />
        To learn more click{" "}
        <Alert.Link
          href="/#"
          onClick={() => {
            openInNewTab(
              "https://www.churchofjesuschrist.org/legal/privacy-notice?lang=eng&country=go"
            );
          }}
        >
          here
          <hr />
        </Alert.Link>
      </CookieConsent>
    </div>
  );
}
