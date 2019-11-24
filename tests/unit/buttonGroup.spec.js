/* eslint-disable no-undef */
import { mount, createLocalVue } from "@vue/test-utils";
// import sinon from "sinon";

// import smui from "@/";
const localVue = createLocalVue();

import Button from "@/components/Button/index.js";
import ButtonGroup from "@/components/Button/ButtonGroup.js";

localVue.use(Button);

describe("ButtonGroup", () => {
  let wrapper = mount(ButtonGroup, {
    localVue,
    slots: {
      default: "<sm-button type='success' >hello</sm-button>"
    }
  });
  test("render", () => {
    expect(wrapper.contains("button.button-success")).toBe(true);
  });
});
