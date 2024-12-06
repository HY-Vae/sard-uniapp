import { type StyleValue } from 'vue'

export interface CollapseProps {
  rootStyle?: StyleValue
  rootClass?: string
  contentClass?: string
  contentStyle?: string
  visible?: boolean
}

export interface CollapseSlots {
  default?(props: Record<string, never>): any
}
