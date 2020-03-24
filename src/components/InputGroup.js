import React, { Component } from "react";
import "./InputGroup.css";

export default class InputGroup extends Component {
  render() {
    return (
      <div class="input__group input__group_vertical">
        <label for="command" class="input__label text text_size_s text_type_h2">
          {this.props.label}
        </label>
        <div class="input__controls">
          <input
            id="command"
            type="text"
            placeholder={this.props.placeholder}
            class="input input_size_m input_width_full
      input_shape_append-right text
      text_size_13_15"
          />
          <div class="input__controls-append">
            {this.props.renderAppend}
            {/* <button class="button button_size_m button_distribute_center">
              <div class="icon icon_size_m">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 12.4 12.4 16 8 16ZM12 5.12L10.88 4L8 6.88L5.12 4L4 5.12L6.88 8L4 10.88L5.12 12L8 9.12L10.88 12L12 10.88L9.12 8L12 5.12Z" />
                </svg>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}
