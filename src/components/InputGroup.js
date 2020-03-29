import React, { Component } from "react";
import "./InputGroup.css";

export default class InputGroup extends Component {
  handleChange = e => {
    const id = this.props.id;
    const value = e.target.value;

    this.props.handleChange(id, value);
  };

  render() {
    const inputclass = `input input_size_m input_width_full input_shape_append-right text text_size_13_15 ${
      this.props.valid ? "input_view_error" : ""
    }`;
    return (
      <div class="input__group input__group_vertical">
        <label for="command" class="input__label text text_size_s text_type_h2">
          {this.props.label}
        </label>
        <div class="input__controls">
          <input
            value={this.props.inputValue}
            id={this.props.id}
            type="text"
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            class={inputclass}
          />
          {this.props.renderAppend && (
            <div class="input__controls-append">{this.props.renderAppend}</div>
          )}
        </div>
      </div>
    );
  }
}
