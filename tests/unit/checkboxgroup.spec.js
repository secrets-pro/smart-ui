/* eslint-disable no-undef */
import { mount, createLocalVue } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const localVue = createLocalVue();
const { Checkbox } = smui;
localVue.use(Checkbox);

import CheckboxGroup from "@/components/Checkbox/CheckboxGroup.js";
describe("CheckboxGroup", () => {
  let wrapper = mount(CheckboxGroup, {
    localVue,
    propsData: {
      value: ["hello"]
    },
    slots: {
      default: `<sm-checkbox true-value='hello' name='hello' false-value='hello1'>
        </sm-checkbox> <sm-checkbox true-value='world' name='world'  false-value='world1' ></sm-checkbox>`
    }
  });
  test("props", () => {
    expect(wrapper.props().value.length).toBe(1);
    const Checkboxs = wrapper.findAll(Checkbox);
    expect(Checkboxs.length).toBe(2);
    expect(Checkboxs.at(0).vm.group).toBe(true);
    expect(Checkboxs.at(0).vm.currentValue).toBe(true);
    expect(Checkboxs.at(1).vm.checkStatus).toBe(false);
    Checkboxs.at(1).trigger("click");
    expect(Checkboxs.at(1).vm.checkStatus).toBe(true);
    wrapper.setProps({
      value: ["hello", "world"]
    });
    expect(Checkboxs.at(0).vm.checkStatus).toBe(true);
    expect(Checkboxs.at(1).vm.checkStatus).toBe(true);
  });
});
