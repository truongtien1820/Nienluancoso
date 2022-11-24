import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
export const Footer = () => {
  return (
    <div className="bg-green-100 h-30 w-full shadow-lg flex justify-evenly text-pink-900">
      <div>
        <img src={logo} alt="logo" className="w-20" />
      </div>
      <div className="flex-col">
        <div className="text-xl font-bold pb-3"> About</div>
        <div className="flex-col pb-2">
          <div>
            <Link className="text-xs" to="">
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              Legal Notices
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              Security Information
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              Trust Center
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex-col">
          <div className="text-xl font-bold pb-3">Support</div>
          <div className="flex-col pb-2">
            <div>
              <Link className="text-xs" to="">
                Contact Us
              </Link>
            </div>
            <div>
              <Link className="text-xs" to="">
                Customer Portal
              </Link>
            </div>
            <div>
              <Link className="text-xs" to="">
                Paid Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col">
        <div className="text-xl font-bold pb-3">Support</div>
        <div className="flex-col pb-2">
          <div>
            <Link className="text-xs" to="">
              Facebook
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              <i className="fab fa-github"></i>Github
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              Youtube
            </Link>
          </div>
          <div>
            <Link className="text-xs" to="">
              Gmail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
