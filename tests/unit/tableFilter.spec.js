/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";
import TableFilter from "@/components/TableOperate/TableFilter.vue";

describe("TableOperate", () => {
  let wrapper = mount(TableFilter, {});
  test("props", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
