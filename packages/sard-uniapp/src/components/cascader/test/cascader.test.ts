import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Cascader from '../cascader.vue'
import { getRegionData } from 'region-data'
import { type CascaderOption } from '../common'

describe('Cascader', () => {
  const regionData = getRegionData()

  test('basic', async () => {
    const wrapper = mount(
      h(Cascader, {
        options: regionData,
        fieldKeys: { label: 'name', value: 'code' },
        modelValue: 440111,
      }),
    )

    expect(
      wrapper
        .findAll('.sar-cascader__option_selected')
        .map((item) => item.text()),
    ).toEqual(['广东省', '广州市', '白云区'])

    await wrapper
      .find('.sar-cascader__pane:last-child .sar-cascader__option:nth-child(4)')
      .trigger('click')

    expect(wrapper.emitted('update:model-value')![0][0]).toBe(440106)

    expect(
      wrapper
        .findAll('.sar-cascader__option_selected')
        .map((item) => item.text()),
    ).toEqual(['广东省', '广州市', '天河区'])

    await wrapper
      .find(
        '.sar-cascader__pane:first-child .sar-cascader__option:nth-child(3)',
      )
      .trigger('click')

    expect(
      wrapper
        .findAll('.sar-cascader__option_selected')
        .map((item) => item.text()),
    ).toEqual(['河北省'])

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(2) .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(
      wrapper
        .findAll('.sar-cascader__option_selected')
        .map((item) => item.text()),
    ).toEqual(['河北省', '石家庄市'])

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(3) .sar-cascader__option:nth-child(2)',
      )
      .trigger('click')

    expect(wrapper.emitted('update:model-value')![1][0]).toBe(130104)

    expect(
      wrapper
        .findAll('.sar-cascader__option_selected')
        .map((item) => item.text()),
    ).toEqual(['河北省', '石家庄市', '桥西区'])

    await wrapper.setProps({
      modelValue: undefined,
    })

    expect(wrapper.findAll('.sar-cascader__option_selected').length).toBe(0)
  })

  test('async', async () => {
    const onSelect = (option: CascaderOption, tabIndex: number) => {
      if (tabIndex < 2 && option.children?.length === 0) {
        setTimeout(() => {
          option.children = Array(10)
            .fill(0)
            .map((_, i) => {
              return {
                label: option.label + '-label' + i,
                value: option.value + '-' + i,
                children: tabIndex < 1 ? [] : undefined,
              }
            })

          options = options.slice()
          wrapper.setProps({ options })
        })
      }
    }

    let options = Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          label: 'label' + i,
          value: i,
          children: [],
        }
      })

    const wrapper = mount(
      h(Cascader, {
        options,
        onSelect,
      }),
    )

    await wrapper
      .find(
        '.sar-cascader__pane:first-child .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(
      wrapper.findAll('.sar-cascader__pane:nth-child(2) .sar-cascader__option')
        .length,
    ).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(
      wrapper.findAll('.sar-cascader__pane:nth-child(2) .sar-cascader__option')
        .length,
    ).toBeGreaterThan(0)

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(2) .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(
      wrapper.findAll('.sar-cascader__pane:nth-child(3) .sar-cascader__option')
        .length,
    ).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(
      wrapper.findAll('.sar-cascader__pane:nth-child(2) .sar-cascader__option')
        .length,
    ).toBeGreaterThan(0)

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(3) .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(wrapper.emitted('update:model-value')![0][0]).toBe('0-0-0')
  })

  test('slot', async () => {
    const wrapper = mount(
      h(
        Cascader,
        {
          options: regionData,
          fieldKeys: { label: 'name', value: 'code' },
        },
        {
          top: ({ tabIndex }: any) =>
            h(
              'div',
              {
                class: 'box',
              },
              tabIndex,
            ),
        },
      ),
    )

    expect(wrapper.find('.box').text()).toBe('0')

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(1) .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(wrapper.find('.box').text()).toBe('1')
  })

  test('disabled', async () => {
    interface Option {
      label: string
      value: string
      disabled: boolean
      children?: Option[]
    }

    const options: Option[] = Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          label: `label${i}`,
          value: `${i}`,
          disabled: i < 3,
          children: Array(10)
            .fill(0)
            .map((_, j) => {
              return {
                label: `label${i}-label${j}`,
                value: `${i}-${j}`,
                disabled: j < 3,
              }
            }),
        }
      })

    const wrapper = mount(
      h(Cascader, {
        options,
      }),
    )

    expect(
      wrapper
        .find(
          '.sar-cascader__pane:nth-child(1) .sar-cascader__option:nth-child(1)',
        )
        .classes(),
    ).toContain('sar-cascader__option_disabled')

    expect(
      wrapper
        .find(
          '.sar-cascader__pane:nth-child(1) .sar-cascader__option:nth-child(4)',
        )
        .classes(),
    ).not.toContain('sar-cascader__option_disabled')

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(1) .sar-cascader__option:nth-child(1)',
      )
      .trigger('click')

    expect(wrapper.findAll('.sar-cascader__pane').length).toBe(1)

    await wrapper
      .find(
        '.sar-cascader__pane:nth-child(1) .sar-cascader__option:nth-child(4)',
      )
      .trigger('click')

    expect(wrapper.findAll('.sar-cascader__pane').length).toBe(2)
  })
})
