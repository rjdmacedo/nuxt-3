import { useState } from "#imports"
import { Notification, UseNotification, UseNotificationPush } from "~/composables/useNotification/types"
import { hash } from "~/utils"

export function useNotification(): UseNotification {
  const notifications = useState<Notification[]>("notifications", () => [])

  const dismiss = (id: string) => {
    notifications.value.splice(
      notifications.value.findIndex(n => n.id === id),
      1,
    )
  }

  const isDuplicate = (params: Pick<Notification, "title" | "message" | "type">) => {
    const hashedNotification = hash(params)
    return notifications.value.some(n => n.id === hashedNotification)
  }

  const notify: UseNotificationPush = params => {
    let message = typeof params === "string" ? params : params.message

    const {
      title = "",
      type = "info",
      queue = false,
      timeout = 0,
      duplicates = false,
      dismissible = false,
      pauseOnHover = false,
      onClick = () => {},
    } = params as Omit<Notification, "id" | "message" | "onDismiss">

    if (!duplicates && isDuplicate({ title, message, type })) return

    const id = hash({ title, message, type })
    notifications.value.push({
      id,
      type,
      queue,
      title,
      timeout,
      message,
      dismissible,
      pauseOnHover,
      onClick,
      onDismiss: () => dismissible && dismiss(id),
    })

    if (typeof timeout === "number") {
      setTimeout(() => dismiss(id), timeout <= 0 ? 3000 : timeout)
    }

    return {}
  }

  return {
    queue: notifications.value,
    notify,
  }
}
