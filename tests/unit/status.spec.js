/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { StatusIcon } = smui;
describe("StatusIcon", () => {
  let wrapper = mount(StatusIcon, {
    propsData: {
      type: "success"
    }
  });
  test("props", () => {
    expect(wrapper.props().type).toBe("success");
    expect(wrapper.classes("sm-status")).toBe(true);
    expect(wrapper.classes("success")).toBe(true);
  });
});
