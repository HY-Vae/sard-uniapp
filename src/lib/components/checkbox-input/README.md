---
nav: 组件
title: CheckboxInput
subtitle: 复选输入框
group: 表单组件
version: 1.3+
---

## 介绍

组合了复选框组、列表、弹出框、输入框组件，实现了在弹出框中多选的功能。

## 引入

```ts
import CheckboxInput from 'sard-uniapp/components/checkbox-input/checkbox-input.vue'
```

## 代码演示

### 基础使用

通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本，
通过 `options` 属性设置可选项。

@code('${DEMO_PATH}/checkbox-input/demo/Basic.vue')

## API

### CheckboxInputProps

继承 [`CheckboxGroupProps`](./checkbox#CheckboxGroupProps) 并有以下额外属性：

| 属性              | 描述                                    | 类型    | 默认值 |
| ----------------- | --------------------------------------- | ------- | ------ |
| clearable         | 是否显示清空按钮                        | boolean | false  |
| placeholder       | 输入框占位符内容                        | string  | -      |
| visible (v-model) | 是否显示弹出框                          | boolean | -      |
| title             | 弹出框标题，不设置则取 `placeholder` 值 | string  | -      |

### CheckboxInputEmits

| 事件                     | 描述                     | 类型                                |
| ------------------------ | ------------------------ | ----------------------------------- |
| update:model-value       | 复选输入组件值改变时触发 | (value: any[] \| undefined) => void |
| change <sup>1.9.2+</sup> | 复选输入组件值改变时触发 | (value: any[] \| undefined) => void |
| update:visible           | 弹出框显隐时触发         | (visible: boolean) => void          |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
