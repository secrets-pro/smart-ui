/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Label } = smui;
describe("Label", () => {
  let wrapper = mount(Label, {
    propsData: {
      datas: {
        key: "value",
        key1: "value2"
      },
      inline: true,
      width: 200
    }
  });
  test("props", () => {
    expect(Object.keys(wrapper.props().datas).join("-")).toBe("key-key1");
    expect(wrapper.props().width).toBe(200);
    expect(wrapper.props().inline).toBe(true);
    expect(Object.keys(wrapper.vm.currentData).join("-")).toBe("key-key1");
  });
  test("set props", () => {
    wrapper.setProps({
      datas: {
        key: "value",
        key1: "value2",
        key2: "value3"
      }
    });
    expect(Object.keys(wrapper.vm.currentData).join("-")).toBe("key-key1-key2");
  });
});
