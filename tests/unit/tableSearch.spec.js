/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { TableSearch } = smui;
describe("TableSearch", () => {
  test("props", () => {
    let wrapper = mount(TableSearch, {
      propsData: {
        value: "hello"
      }
    });
    expect(wrapper.vm.currentValue).toBe("hello");
    wrapper.setProps({
      value: "world"
    });
    expect(wrapper.vm.currentValue).toBe("world");
    expect(wrapper.vm.currentFilters.length).toBe(0);
    expect(wrapper.vm.noFilters.length).toBe(0);
    wrapper.find("input").trigger("keyup.enter");
    wrapper.find("input").setValue("123");
    expect(wrapper.vm.currentValue).toBe("123");
    wrapper.find(".right-icon").trigger("click");
    expect(wrapper.vm.currentValue).toBe("");
    wrapper.destroy();
  });

  test("filters", () => {
    let wrapper = mount(TableSearch, {
      propsData: {
        value: "",
        filters: [
          {
            label: "名称",
            name: "name"
          }
        ]
      }
    });

    expect(wrapper.vm.currentFilters.length).toBe(1);
    expect(wrapper.vm.noFilters.length).toBe(1);

    wrapper.setProps({
      filters: [
        {
          label: "名称",
          name: "name",
          prefix: "vue"
        },
        {
          label: "年龄",
          name: "age",
          options: [
            {
              label: "大于20",
              value: "more20"
            },
            {
              label: "小于20",
              value: "less20"
            }
          ]
        }
      ]
    });
    wrapper.find("input").trigger("focus");
    expect(wrapper.vm.showFilter).toBe(true);
    // 显示下拉
    expect(wrapper.find(".sm-dropdown-content").isVisible()).toBe(true);
    // 点击第一个
    wrapper.find("li:first-of-type").trigger("click");
    expect(wrapper.vm.currentValue).toBe("名称:");
    // 输入框赋值
    wrapper.find("input").setValue("名称:xxx");
    // 此时下拉框应该是隐藏的
    //expect(wrapper.find(".sm-dropdown-content").isVisible()).toBe(false);
    // 模拟enter事件
    wrapper.find("input").trigger("keyup.enter");
    expect(wrapper.vm.tags.length).toBe(1);

    // 再点一个option的
    wrapper.find("input").trigger("focus");
    wrapper.find("li:first-of-type").trigger("click");
    wrapper.find("li:first-of-type").trigger("click");
    expect(wrapper.vm.tags.length).toBe(2);
    // close tags
    wrapper
      .findAll("svg")
      .at(1)
      .trigger("click");
    expect(wrapper.vm.tags.length).toBe(1);
    // clear
    wrapper.find(".right-icon").trigger("click");
    expect(wrapper.vm.currentValue).toBe("");
    expect(wrapper.find(".right-icon").isVisible()).toBe(false);
    wrapper.destroy();
  });
});
