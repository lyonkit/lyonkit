export type ToastNotificationType = 'success' | 'error' | 'warning' | 'info'

const state = reactive({
  message: '',
  type: 'success' as ToastNotificationType,
  timeout: 5000,
  show: false,
})

export function useToast() {
  return {
    openToast({
      message,
      type = 'success',
      timeout = 5000,
    }: { message: string; type?: ToastNotificationType; timeout?: number }) {
      state.message = message
      state.type = type
      state.timeout = timeout
      state.show = true
    },
    ...toRefs(state),
  }
}
