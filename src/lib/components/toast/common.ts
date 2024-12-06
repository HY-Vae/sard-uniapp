import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ToastProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string | number
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  timeout?: number
  duration?: number
}

export const defaultToastProps = defaultConfig.toast

export interface ToastEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
