/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Button } = smui;
describe("Button", () => {
  let wrapper = mount(Button, {
    propsData: {
      type: "primary",
      confirm: true,
      icon: "ios-add",
      aftericon: "ios-add"
    },
    slots: {
      default: "hello"
    }
  });
  test("props", () => {
    expect(wrapper.props().type).toBe("primary");
    expect(wrapper.classes("button-primary")).toBe(true);
    expect(wrapper.classes("button-icon")).toBe(true);
    expect(wrapper.find("span").text()).toBe("hello");
    expect(wrapper.vm.currentDisabled).toBe(false);
    wrapper.setProps({
      disabled: true
    });
    expect(wrapper.vm.currentDisabled).toBe(true);
  });
  test("event", () => {
    wrapper.setProps({
      disabled: false
    });
    wrapper.trigger("click");
    expect(wrapper.vm.currentDisabled).toBe(true);
    setTimeout(() => {
      expect(wrapper.vm.currentDisabled).toBe(false);
      wrapper.setProps({
        to: "/"
      });
      wrapper.trigger("click");
    }, 2100);
  });
});
