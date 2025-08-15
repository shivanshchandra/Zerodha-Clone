import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.svg" style={{ width: "50%" }} />
            <p>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
              <a href="" className="link-muted">About</a>
              <br />
              <a href="" className="link-muted">Products</a>
              <br />
              <a href="" className="link-muted">Pricing</a>
              <br />
              <a href="" className="link-muted">Referral programme</a>
              <br />
              <a href="" className="link-muted">Careers</a>
              <br />
              <a href="" className="link-muted">Zerodha.tech</a>
              <br />
              <a href="" className="link-muted">Press & media</a>
              <br />
              <a href="" className="link-muted">Zerodha cares (CSR)</a>
              <br />
          </div>
          <div className="col">
            <p>Support</p>
              <a href="" className="link-muted">Contact</a>
              <br />
              <a href="" className="link-muted">Support portal</a>
              <br />
              <a href="" className="link-muted">Z-Connect blog</a>
              <br />
              <a href="" className="link-muted">List of charges</a>
              <br />
              <a href="" className="link-muted">Downloads & resources</a>
              <br />
          </div>
          <div className="col">
            <p>Account</p>
              <a href="" className="link-muted">Open an account</a>
              <br />
              <a href="" className="link-muted">Fund transfer</a>
              <br />
              <a href="" className="link-muted">60 day challenge</a>
              <br />
          </div>
        </div>
        <div className="mt-5" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>

        <div className="d-flex justify-content-center flex-wrap mt-5"
        style={{ gap: "24px", fontSize: "14px", color: "#6c757d" }}>
            <a href="" className="link-muted">NSE</a>
            <a href="" className="link-muted">BSE</a>
            <a href="" className="link-muted">MCX</a>
            <a href="" className="link-muted">Terms & conditions</a>
            <a href="" className="link-muted">Policies & procedures</a>
            <a href="" className="link-muted">Privacy policy</a>
            <a href="" className="link-muted">Disclosures</a>
        </div>
      </div>


      {/* Inline Styles */}
      <style>
        {`
          .link-muted {
            text-decoration: none;
            color: #6c757d; /* Muted color */
            margin-bottom: 15px; /* Add space between links */
            display: inline-block; /* Ensures margin works correctly */
          }

          .link-muted:hover {
            text-decoration: none;
            color: #343a40; /* Slightly darker muted color for hover */
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
