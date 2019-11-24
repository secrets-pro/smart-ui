/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Table } = smui;
describe("Table", () => {
  let wrapper = mount(Table, {
    propsData: {
      compare: false,
      pagination: true,
      showSearch: true,
      url: "www.baidu.com",
      data: [
        {
          createTime: "xxx",
          name: "xxx"
        },
        {
          createTime: "",
          name: ""
        }
      ],
      columns: [
        {
          type: "index"
        },
        {
          type: "checkbox"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "name",
          key: "name"
        }
      ]
    }
  });
  test("props", () => {
    expect(wrapper.props().columns.length).toBe(4);
  });
  test("checkbox", () => {
    wrapper.setProps({
      selectAll: true
    });
    wrapper.setProps({
      selectAll: false
    });
    wrapper.vm.refresh(1);
  });
});
