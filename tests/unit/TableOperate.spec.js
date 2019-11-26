/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";
import TableOperate from "@/components/TableOperate/TableOperate.vue";

describe("TableOperate", () => {
  let wrapper = mount(TableOperate, {});
  test("props", () => {
    expect(wrapper.isVueInstance()).toBe(true);
    wrapper.setProps({
      setting: [
        {
          name: "test",
          text: "test-text"
        },
        {
          text: "test-text"
        },
        {
          text: "test-text",
          auth: "xxxx"
        }
      ]
    });
  });
});
