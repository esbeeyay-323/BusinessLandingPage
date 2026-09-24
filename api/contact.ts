import { Resend } from "resend";
import { env } from 'node:process';

type Enquiry = {
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

const eventTypes = new Set([
  'Wedding',
  'Corporate event',
  'Private dining',
  'Pastries & pies',
  'Other occasion',
]);

const packageTypes = new Set(['', 'Essential', 'Signature', 'Bespoke']);

function isValidEnquiry(value: unknown): value is Enquiry {
  if (!value || typeof value !== 'object') return false;

  const enquiry = value as Record<string, unknown>;

  return (
    typeof enquiry.name === 'string' &&
    enquiry.name.trim().length >= 2 &&
    enquiry.name.length <= 100 &&
    !/[\r\n]/.test(enquiry.name) &&
    typeof enquiry.email === 'string' &&
    enquiry.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email.trim()) &&
    typeof enquiry.phone === 'string' &&
    (!enquiry.phone || /^[+\d\s().-]{7,25}$/.test(enquiry.phone.trim())) &&
    typeof enquiry.event === 'string' &&
    eventTypes.has(enquiry.event) &&
    typeof enquiry.date === 'string' &&
    (!enquiry.date || /^\d{4}-\d{2}-\d{2}$/.test(enquiry.date)) &&
    typeof enquiry.guests === 'string' &&
    (!enquiry.guests ||
      (/^\d+$/.test(enquiry.guests) &&
        Number(enquiry.guests) >= 1 &&
        Number(enquiry.guests) <= 10000)) &&
    typeof enquiry.package === 'string' &&
    packageTypes.has(enquiry.package) &&
    typeof enquiry.message === 'string' &&
    enquiry.message.trim().length >= 10 &&
    enquiry.message.length <= 3000 &&
    enquiry.consent === true
  );
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json(
        { error: 'Method not allowed.' },
        {
          status: 405,
          headers: { Allow: 'POST' },
        },
      );
    }

    const origin = request.headers.get('origin');

    if (origin && new URL(origin).host !== new URL(request.url).host) {
      return Response.json({ error: 'Origin not allowed.' }, { status: 403 });
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return Response.json(
        { error: 'Content-Type must be application/json.' },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get('content-length') ?? 0);

    if (contentLength > 20_000) {
      return Response.json({ error: 'Request is too large.' }, { status: 413 });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON.' }, { status: 400 });
    }

    if (!isValidEnquiry(body)) {
      return Response.json(
        { error: 'Please check the submitted enquiry.' },
        { status: 400 },
      );
    }

    const apiKey = env.RESEND_API_KEY;
    const recipient = env.CONTACT_TO_EMAIL;

    if (!apiKey || !recipient) {
      console.error('Contact email environment variables are missing.');
      return Response.json(
        { error: 'Email delivery is not configured.' },
        { status: 500 },
      );
    }

    const enquiry: Enquiry = {
      ...body,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      message: body.message.trim(),
    };

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Harvest & Grace <onboarding@resend.dev>',
      to: [recipient],
      replyTo: enquiry.email,
      subject: `New ${enquiry.event} enquiry from ${enquiry.name}`,
      text: [
        'A new enquiry was submitted through the Harvest & Grace website.',
        '',
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone || 'Not provided'}`,
        `Occasion: ${enquiry.event}`,
        `Event date: ${enquiry.date || 'Not provided'}`,
        `Guests: ${enquiry.guests || 'Not provided'}`,
        `Package: ${enquiry.package || 'Not selected'}`,
        '',
        'Message:',
        enquiry.message,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend rejected the contact email:', error.message);
      return Response.json(
        { error: 'The enquiry could not be delivered.' },
        { status: 502 },
      );
    }

    return Response.json({ success: true, id: data?.id }, { status: 200 });
  },
};