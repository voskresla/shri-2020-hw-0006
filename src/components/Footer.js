import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div class="footer">
        <div class="footer__content">
          <div class="footer__links">
            <a href="http://">
              <div class="text text_view_ghost text_size_s text_type_link">
                Support
              </div>
            </a>
            <a href="http://">
              <div class="text text_view_ghost text_size_s text_type_link">
                Learning
              </div>
            </a>
          </div>
          <div class="footer__copyright">
            <div class="text text text_size_s text_view_ghost">
              © Copyright 2020
            </div>
          </div>
        </div>
      </div>
    );
  }
}
