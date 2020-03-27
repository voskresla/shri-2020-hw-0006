import React, { Component } from "react";
import { cn } from "../utils/index";
import { withNaming } from "@bem-react/classname";
import "./Card.css";

import Icon from "./Icon";
import List from "./List";

const className = cn("card");
const cn2 = withNaming({ e: "__", m: "_" });

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
          {/* TODO: сделать компонент IconContent */}
          <div class="icon-content">
            <div className="icon-content__icon text text_view_success">
              <Icon
                type={iconTypeMap[this.props.item.status]}
                className={{ view: iconTypeMap[this.props.item.status] }}
              />
            </div>
          </div>
        </div>
        <div class="card__content">
          <div class="card__history list">
            <div class="card__status list__item">
              <div class="card__number text text_size_18_20 text_view_success">
                #1368
              </div>
              <div class="card__message text text_size_15_20 text_view_truncate">
                add documentation for postgres scaler add documentation add
                documentation for postgres scaler add documentation add
                documentation for postgres scaler add documentation
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
