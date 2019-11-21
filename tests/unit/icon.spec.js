/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Icon } = smui;
describe("DropDown", () => {
  const type = "ios-add";
  const prefix = "sm-ionic";
  const wrapper = mount(Icon, {
    propsData: {
      type: type,
      size: "12",
      color: "red"
    }
  });
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test("props", () => {
    expect(wrapper.props().type).toBe(type);
    expect(wrapper.props().size).toBe("12");
    expect(wrapper.props().color).toBe("red");
  });
  test("render Tag i", () => {
    expect(wrapper.contains("i")).toBe(true);
  });
  test("classes", () => {
    expect(wrapper.classes(prefix)).toBe(true);
    expect(wrapper.classes(`${prefix}-${type}`)).toBe(true);
    expect(wrapper.html().indexOf("font-size: 12px") > -1).toBe(true);
    expect(wrapper.html().indexOf("color: red") > -1).toBe(true);
  });
  test("emmit", () => {
    wrapper.vm.$emit("click");
    wrapper.vm.$emit("click", 123);

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click").length).toBe(2);
    expect(wrapper.emitted("click")[1]).toEqual([123]);
    // const clickMethodStub = sinon.stub();

    // wrapper.setMethods({ click: clickMethodStub });
    // wrapper.find("i").trigger("click");
    // expect(clickMethodStub.called).toBe(true);
  });
});
