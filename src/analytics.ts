export type QuizEvent = 'quiz_started' | 'question_answered' | 'quiz_completed'

const apiUrl = import.meta.env.VITE_METRICS_API_URL?.replace(/\/$/, '')

export function recordQuizEvent(type: QuizEvent): void {
  if (!apiUrl) return

  void fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type }),
    keepalive: true,
  }).catch(() => {
    // The quiz remains usable if analytics are unavailable.
  })
}
