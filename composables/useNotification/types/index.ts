import { DeepReadonly } from "@vue/reactivity"

export type Notification = {
  id: string
  title?: string
  message: string
  queue?: boolean
  timeout?: number | boolean
  duplicates?: boolean
  dismissible?: boolean
  pauseOnHover?: boolean
  onClick?: () => unknown
  onDismiss?: DeepReadonly<() => void>
  type?: "success" | "info" | "warning" | "error"
}

export type UseNotificationPushParams = string | Omit<Notification, "id" | "onDismiss">

export type UseNotificationPush = (params: UseNotificationPushParams) => {
  // dismiss: () => void
}

export interface UseNotification {
  queue: Notification[]
  notify: UseNotificationPush
}
