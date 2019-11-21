/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import smUI from "@/";
const { Select } = smUI;
describe("select", () => {
  let value = "1";
  let wrapper = mount(Select, {
    propsData: {
      value: value,
      options: [
        {
          text: "11",
          value: "1"
        },
        {
          text: "12",
          value: "2"
        }
      ]
    }
  });
  test("props ", () => {
    expect(wrapper.props().value).toBe("1");
    expect(wrapper.props().propValue).toBe("value");
    expect(wrapper.props().propText).toBe("text");
    expect(wrapper.props().options.length).toBe(2);
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
  test("on-click", () => {
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
