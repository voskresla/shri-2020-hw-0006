import React, { Component } from "react";
import Layout from "./Layout";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
import Button from "./Button";

export default class Settings extends Component {
  render() {
    return (
      <Layout>
        <LayoutContainer className={{ size: "s", align: "center" }}>
          <Header />
        </LayoutContainer>
        <LayoutContainer className={{ size: "s", align: "center" }}>
          <div class="grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_12">
            <div class="grid__fraction grid__fraction_m-col_7">
              <form class="form">
                <div class="form__title">
                  <div class="form__header text text_type_h2 text_size_m">
                    Settings
                  </div>
                  <div class="form__subheader text text_size_s text_view_ghost">
                    Configure repository connection and synchronization
                    settings.
                  </div>
                </div>
                <div class="form__items">
                  <div class="form__item form__item_indent-b_xl">
                    <InputGroup
                      label="Build Command"
                      renderAppend={
                        <Button
                          className={{ size: "m", distribute: "center" }}
                          withIcon={true}
                          withText={false}
                          text={"a"}
                        />
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </LayoutContainer>
        <Footer />
      </Layout>
    );
  }
}
