import React, { Component } from "react";
import { cn } from "../utils/index";
import { withNaming } from "@bem-react/classname";
import "./Card.css";

import Icon from "./Icon";

const className = cn("card");
const cn2 = withNaming({ e: "__", m: "_" })("text");

const iconTypeMap = {
  Success: "success",
  InProgress: "warning",
  Fail: "error",
  Waiting: "warning",
  Canceled: "error"
};

export default class Card extends Component {
  render() {
    return (
      <div className="card card_summary">
        <div className={className("token")}>
          <div class="icon-content">
            <div class="icon-content__icon text text_view_success">
              <Icon
                type={iconTypeMap[this.props.item.status]}
                className={{ view: iconTypeMap[this.props.item.status] }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
