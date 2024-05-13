import { type CalendarProps } from '../calendar/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'

export interface CalendarInputProps
  extends CalendarProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
}

export const calendarInputPropsDefaults = {
  ...defaultConfig.calendarInput,
  ...defaultConfig.calendar,
}

export interface CalendarInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: Date | Date[] | undefined): void
}
