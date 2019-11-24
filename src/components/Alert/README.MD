# 提示信息

目前比较简单 后续有需要再扩展

## 事件

## props

| 名称 | 类型   | 说明 | 默认值 | required |
| ---- | ------ | ---- | ------ | -------- |
| type | String | 类型 | info   | false    |

### type

info success error warn

## slot

default

demo

```html
<sm-alert type="info"
  >创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。</sm-alert
>
<sm-alert type="error"
  >创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。</sm-alert
>
<sm-alert type="success"
  >创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。</sm-alert
>
<sm-alert type="warn"
  >创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。</sm-alert
>
```
