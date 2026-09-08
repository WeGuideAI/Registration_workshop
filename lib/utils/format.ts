// Date/time formatting utilities shared across client & server components

export function formatSessionDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

export function formatSessionTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
}

export function formatRegistrationId(id: string): string {
  return `WG-${id.split('-')[0].toUpperCase()}`
}
