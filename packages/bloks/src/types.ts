interface PropType {
  type: string
  required?: boolean
  default?: any
  label: string
}

export interface SelectProps extends PropType {
  type: 'select'
  options: (string | number)[]
  default?: string | number
}

export type Props = Record<string, SelectProps>
