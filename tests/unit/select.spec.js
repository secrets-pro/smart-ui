/* eslint-disable no-undef */
import { mount, createLocalVue } from "@vue/test-utils";
import smUI from "@/";
import Option from "@/components/Select/Option";
const { Select } = smUI;
const localVue = createLocalVue();
localVue.component("sm-option", Option);
describe("select", () => {
  let value = "1";
  let wrapper = mount(Select, {
    localVue,
    propsData: {
      value: value
    },
    slots: {
      default: `
      <sm-option value="1">11</sm-option>
      <sm-option value="2" label="12"></sm-option>
       `
    }
  });
  test("props ", () => {
    expect(wrapper.props().value).toBe("1");
    expect(wrapper.props().placeholder).toBe("请选择");
  });
  test("event", () => {
    wrapper.find("input").trigger("focus");
    wrapper.find("li:last-of-type").trigger("click");
    expect(wrapper.vm.currentValue).toBe("2");
    expect(wrapper.vm.currentText).toBe("12");
    wrapper.find("input").trigger("focus");
    wrapper.find("li:first-of-type").trigger("click");
    expect(wrapper.vm.currentValue).toBe("1");
    expect(wrapper.vm.currentText).toBe("11");
  });
  test("setProps", () => {
    wrapper.setProps({ value: "2" });
    expect(wrapper.vm.currentValue).toBe("2");
    expect(wrapper.vm.currentText).toBe("12");
    wrapper.setProps({ value: "3" });
    expect(wrapper.vm.currentValue).toBe("3");
    expect(wrapper.vm.currentText).toBe("");
  });
  test("icon-click", () => {
    wrapper.find("input").trigger("focus");
    wrapper.find(".sm-ionic").trigger("click");
    expect(wrapper.vm.active).toBe(false);
    wrapper.find(".sm-ionic").trigger("click");
    expect(wrapper.vm.active).toBe(true);
  });
  test("empty options", () => {
    wrapper.setProps({
      options: null
    });
    expect(wrapper.vm.currentText).toBe("");
  });
});
