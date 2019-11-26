# TableSearch

快捷搜索框 [sm-search-input](src/example/TableSerach.vue)

## 事件

- @search 按 enter 查询

- @clear 点击清空

## props

| 名称        | 类型   | 说明     | 默认值 | required |
| ----------- | ------ | -------- | ------ | -------- |
| value       | String | v-model  | ''     | false    |
| filters     | Array  | 快捷配置 | []     | true     |
| placeholder | String | 内容提示 | ''     | false    |

### filters

```json
[
  {
    "label": "名称",
    "name": "name"
  },
  {
    "label": "年龄",
    "name": "age",
    "options": [
      {
        "label": "大于20",
        "value": "more20"
      },
      {
        "label": "小于20",
        "value": "less20"
      }
    ]
  }
]
```

如果配置了`filters`,则 search 事件会传递一个`object`回来
