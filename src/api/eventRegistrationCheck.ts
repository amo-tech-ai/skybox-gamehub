// API helper for checking if a phone is already registered for an event

const SUPABASE_PROJECT_ID = 'dbocegamkdnsorhtdbni';
const REGISTRATION_CHECK_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/event-registration-check`;

export interface RegistrationCheckPayload {
  eventId: string;
  phone: string;
}

export interface RegistrationCheckResponse {
  exists: boolean;
  registration: {
    id: string;
    status: string;
  } | null;
}

/**
 * Checks if a phone number is already registered for an event
 * @throws Error if the API call fails
 */
export async function checkEventRegistration(
  payload: RegistrationCheckPayload
): Promise<RegistrationCheckResponse> {
  console.log('Checking event registration:', payload);

  const response = await fetch(REGISTRATION_CHECK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Registration check API error:', data);
    throw new Error(data?.error || 'Failed to check registration');
  }

  console.log('Registration check result:', data);
  return data;
}
