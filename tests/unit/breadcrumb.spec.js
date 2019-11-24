/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Breadcrumb } = smui;
describe("Breadcrumb", () => {
  let wrapper = mount(Breadcrumb, {
    propsData: {
      items: [
        {
          label: "test"
        },
        {
          label: "test2",
          to: "hello"
        }
      ]
    }
  });
  test("props", () => {
    expect(wrapper.props().items.length).toBe(2);
  });
  test("rendered html", () => {
    let as = wrapper.findAll("a");
    expect(as.length).toBe(3);
    expect(as.at(1).classes("cursor")).toBe(false);
    expect(as.at(2).classes("cursor")).toBe(true);
  });
  test("event", () => {
    let as = wrapper.findAll("a");
    as.at(0).trigger("click");
    as.at(1).trigger("click");
    as.at(2).trigger("click");
  });
});
