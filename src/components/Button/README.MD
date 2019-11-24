# Button

## props

| 名称      | 类型    | 说明             | 默认值    | required |
| --------- | ------- | ---------------- | --------- | -------- |
| type      | String  | 按钮类型         | 'default' | false    |
| long      | Boolean | 长按钮           | false     | false    |
| circle    | Boolean | 圆角             | false     | false    |
| icon      | String  | 前部图标         | null      | false    |
| aftericon | String  | 后部图标         | null      | false    |
| to        | String  | 路由跳转（path） | null      | false    |
| size      | String  | 按钮大小         | null      | false    |
| disabled  | Boolean | 禁用             | false     | false    |
| confirm   | Boolean | 确认按钮         | false     | false    |

## type

- primary
- success
- danger
- info
- warning
- text
- error
- dark
- default

  也可以自定义颜色

## confirm

如果设置了该属性 点击后会有 2s 的禁用
