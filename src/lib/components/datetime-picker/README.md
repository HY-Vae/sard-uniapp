---
nav: 组件
title: DatetimePicker
subtitle: 日期时间选择器
group: 表单组件
---

## 介绍

用于选择日期时间。

## 引入

```ts
import DatetimePicker from 'sard-uniapp/components/datetime-picker/datetime-picker.vue'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `type` 属性设置要展示的列类型。

@code('${DEMO_PATH}/datetime-picker/demo/Basic.vue')

### 类型

可以使用 `yMdhms`（年月日时分秒）进行任意组合，每个字母对应一列。

@code('${DEMO_PATH}/datetime-picker/demo/Type.vue')

### 自定义日期时间范围

可以使用 `min` 和 `max` 属性限制可以选择的日期时间的范围。

@code('${DEMO_PATH}/datetime-picker/demo/MinMax.vue')

### 过滤器

可以使用 `filter` 属性来仅展示想要的内容，只有返回真的值才会展示。

@code('${DEMO_PATH}/datetime-picker/demo/Filter.vue')

### 格式化

可以使用 `formatter` 属性格式化展示的内容。

@code('${DEMO_PATH}/datetime-picker/demo/Formatter.vue')

## API

### DatetimePickerProps

| 属性                          | 描述                                         | 类型                                                                                                            | 默认值 |
| ----------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| root-class                    | 组件根元素类名                               | string                                                                                                          | -      |
| root-style                    | 组件根元素样式                               | StyleValue                                                                                                      | -      |
| type                          | 设置每一列要展示的数据类型，每个字母对应一列 | string [详见特殊符号](#DatetimeLetter)                                                                          | 'yMd'  |
| min                           | 可选的最小日期                               | Date                                                                                                            | 十年前 |
| max                           | 可选的最大日期                               | Date                                                                                                            | 十年后 |
| model-value                   | 当前选中的日期                               | Date \| string                                                                                                  | -      |
| filter                        | 选项的过滤函数                               | (letter: DatetimeLetter, value: number, date: Date, index: number) => boolean                                   | -      |
| formatter                     | 选项的格式化函数                             | (letter: DatetimeLetter, option: DatetimeColumnOption, date: Date, index: number) => string \| void \|undefined | -      |
| value-format <sup>1.10+</sup> | 绑定值的格式，不指定则绑定值为 Date 对象     | string [详见特殊符号](../guide/date#日期格式特殊符号)                                                           | -      |

### DatetimePickerEmits

| 事件                     | 描述                 | 类型                           |
| ------------------------ | -------------------- | ------------------------------ |
| update:model-value       | 选中的选项改变时触发 | (date: Date \| string) => void |
| change <sup>1.9.2+</sup> | 选中的选项改变时触发 | (date: Date \| string) => void |

### DatetimeLetter

```ts
type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'
```

上面每个字母分别代表“年月日时分秒”。

### DatetimeColumnOption

| 属性     | 描述                                               | 类型                        |
| -------- | -------------------------------------------------- | --------------------------- |
| value    | 选项值                                             | number                      |
| label    | 展示的文本，默认中文会在值的后面加上“年月日时分秒” | string \| number \| boolean |
| zerofill | 填充前置 0 后的选项值字符串，可在格式化时使用      | string                      |
