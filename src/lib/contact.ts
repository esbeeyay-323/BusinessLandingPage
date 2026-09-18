import { eventTypes, packages } from '../data/site';

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  event: string;
  date: string;
  guests: string;
  package: string;
  message: string;
  consent: boolean;
};
export type FormErrors = Partial<Record<keyof Enquiry, string>>;

export function todayLocal() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function initialEnquiry(params: URLSearchParams): Enquiry {
  const event = params.get('event') ?? '';
  const selectedPackage = params.get('package') ?? '';
  return {
    name: '',
    email: '',
    phone: '',
    event: eventTypes.some((item) => item === event) ? event : '',
    date: '',
    guests: '',
    package: packages.some((item) => item.name === selectedPackage) ? selectedPackage : '',
    message: '',
    consent: false,
  };
}

export function validateEnquiry(values: Enquiry): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2)
    errors.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+\d\s().-]{7,25}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.';
  if (!eventTypes.some((item) => item === values.event))
    errors.event = 'Please choose an occasion.';
  if (values.date && (values.date < todayLocal() || !/^\d{4}-\d{2}-\d{2}$/.test(values.date)))
    errors.date = 'Please choose today or a future date.';
  if (
    values.guests &&
    (!/^\d+$/.test(values.guests) || Number(values.guests) < 1 || Number(values.guests) > 10000)
  )
    errors.guests = 'Please enter a guest count from 1 to 10,000.';
  if (values.message.trim().length < 10)
    errors.message = 'Tell us a little more (at least 10 characters).';
  if (values.message.length > 3000)
    errors.message = 'Please keep your message within 3,000 characters.';
  if (!values.consent) errors.consent = 'Please agree so we can respond to your enquiry.';
  return errors;
}

export async function submitEnquiry(values: Enquiry, endpoint: string): Promise<'demo' | 'sent'> {
  if (!endpoint) return 'demo';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(
      'We could not send your enquiry. Your details are still here. Please try again.'
    );
  return 'sent';
}
