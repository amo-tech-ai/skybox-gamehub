// API helper for sending post-event feedback requests via WhatsApp

const SUPABASE_PROJECT_ID = 'dbocegamkdnsorhtdbni';
const FEEDBACK_REQUEST_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/event-feedback-request`;

export interface FeedbackRequestPayload {
  eventId: string;
  feedbackLink?: string;
}

export interface FeedbackRequestResponse {
  success: boolean;
  message: string;
  sent: number;
  failed: number;
  total: number;
}

/**
 * Sends feedback request WhatsApp messages to all event attendees
 * @throws Error if the API call fails
 */
export async function sendEventFeedbackRequest(
  payload: FeedbackRequestPayload
): Promise<FeedbackRequestResponse> {
  console.log('Sending event feedback request:', payload);

  const response = await fetch(FEEDBACK_REQUEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Feedback request API error:', data);
    throw new Error(data?.error || 'Failed to send feedback requests');
  }

  console.log('Feedback requests sent successfully:', data);
  return data;
}
