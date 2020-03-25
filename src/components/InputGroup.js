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
            class="input input_size_m input_width_full input_shape_append-right text text_size_13_15"
          />
          {this.props.renderAppend && (
            <div class="input__controls-append">{this.props.renderAppend}</div>
          )}
        </div>
      </div>
    );
  }
}
