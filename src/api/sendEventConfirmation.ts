// API helper for sending event confirmation via WhatsApp

const SUPABASE_PROJECT_ID = 'dbocegamkdnsorhtdbni';
const EVENT_CONFIRMATION_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/event-confirmation`;

export interface EventConfirmationPayload {
  name: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventTime?: string;
  eventLocation?: string;
  eventId?: string;
  bookingId?: string;
}

/**
 * Sends a WhatsApp confirmation message for event registration
 * @throws Error if the API call fails
 */
export async function sendEventConfirmation(
  payload: EventConfirmationPayload
): Promise<void> {
  console.log('Sending event confirmation:', payload);

  const response = await fetch(EVENT_CONFIRMATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Event confirmation API error:', data);
    throw new Error(data?.error || 'Failed to send event confirmation');
  }

  console.log('Event confirmation sent successfully:', data);
}
