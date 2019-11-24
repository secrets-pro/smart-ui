# 表格

高度封装的表格

## 事件

- on-refresh
  点击刷新按钮触发

## props

| 名称         | 类型    | 说明                               | 默认值 | required |
| ------------ | ------- | ---------------------------------- | ------ | -------- |
| pagination   | Boolean | 是否分页                           | false  |          |
| columns      | Array   | 列配置                             | []     | true     |
| showSearch   | Boolean | 显示搜索框                         | false  |          |
| url          | String  | 查询地址                           | ''     | true     |
| data         | Array   | 默认数据                           | []     | false    |
| searchParams | Object  | 搜索参数                           | {}     | false    |
| type         | String  | 表格类型 (simple)                  | null   | false    |
| fixed        | Boolean | 是否固定表头                       | false  | false    |
| height       | String  | tbody 的高度 fixed 为 true 时 生效 | false  | false    |

### columns

| 名称     | 类型     | 说明                 | 默认值 | required |
| -------- | :------- | -------------------- | :----- | :------- |
| title    | String   | 列标题               | ""     | true     |
| key      | String   | 字段标志             | ""     | true     |
| sortable | Boolean  | 是否可排序           | false  | false    |
| dymic    | Boolean  | 是否可动态设置列显示 | false  | false    |
| render   | Function | 渲染函数             | null   | false    |

### type

如果是`simple` 则直接没有表格头部的操作栏，需要自己利用`slot#header`来实现刷新

## columns

```js
{
    title: "创建时间",
    key: "createTime",
    sortable: true,
    dymic:false
    render: function(h, params) {
        // todo
    }.bind(this),
    render: (h, params)=>{
        // todo
    }
},
```

## slots

- searchext
  搜索框左边空白位置
- header
  表格的 title 介绍
- extra
  搜索框右边空白位置
- default
  [自定义表格渲染](../example/Table.vue)
- operate
  当复选框选中时的弹出层 必须要有 header

## 手动刷新

this.\$refs.table.refresh();
