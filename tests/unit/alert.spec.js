/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Alert } = smui;
describe("alert", () => {
  let wrapper = mount(Alert, {});
  test("props", () => {
    expect(wrapper.vm.type).toBe("info");
  });
});
