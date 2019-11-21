# Dropdown

## props

| 名称      | 类型   | 说明         | 默认值  | required |
| --------- | ------ | ------------ | ------- | -------- |
| placement | String | 展开方向     | left    | false    |
| styles    | Object | 展开内容样式 | {}      | false    |
| theme     | String | 主题         | default | false    |
| trigger   | String | 触发方式     | click   | false    |

### placement

`left`,`center`,`right`

### theme

`dark`

### trigger

`custom`,`click`

## event

- on-click(name)

## demo

```html
<sm-dropdown placement="center" @on-click="click">
  <sm-button
    type="dark"
    v-ripple
    circle
    icon="keyboard_arrow_up"
    aftericon="keyboard_arrow_down"
    >创建应用</sm-button
  >
  <template slot="content">
    <sm-dropdown-item name="name1" selected>
      <sm-icon type="shop" />哈哈
    </sm-dropdown-item>
    <sm-dropdown-item name="name2">
      <sm-icon type="shop" />哈哈
    </sm-dropdown-item>
    <sm-dropdown-item name="name3">
      <sm-icon type="shop" />哈哈
    </sm-dropdown-item>
  </template>
</sm-dropdown>
```
