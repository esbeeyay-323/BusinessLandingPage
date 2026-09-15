import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Checkbox, ConfigProvider, DatePicker, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { eventTypes, packages } from '../data/site';
import {
  initialEnquiry,
  submitEnquiry,
  todayLocal,
  validateEnquiry,
  type Enquiry,
  type FormErrors,
} from '../lib/contact';

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? '';

function Field({
  name,
  label,
  optional,
  error,
  children,
}: {
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field mb-0 min-w-0 [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-medium [&_label_span]:text-[11px] [&_label_span]:font-normal [&_label_span]:text-muted [&_textarea.ant-input]:min-h-[140px] [&_textarea.ant-input]:resize-y [&>.ant-input]:w-full [&>.ant-input]:max-w-full [&>.ant-input]:min-w-0 [&>.ant-input-number]:w-full [&>.ant-input-number]:max-w-full [&>.ant-input-number]:min-w-0 [&>.ant-picker]:w-full [&>.ant-picker]:max-w-full [&>.ant-picker]:min-w-0 [&>.ant-select]:w-full [&>.ant-select]:max-w-full [&>.ant-select]:min-w-0 [&>.field-error]:min-h-8">
      <label htmlFor={name}>
        {label}
        {optional && <span> (optional)</span>}
      </label>
      {children}
      <p className="field-error mt-1.5 text-[11px] text-error" id={`${name}-error`}>
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState<Enquiry>(() => initialEnquiry(params));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'demo' | 'sent' | 'error'>('idle');
  const [deliveryError, setDeliveryError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  useEffect(() => {
    if (status === 'demo' || status === 'sent') resultRef.current?.focus();
  }, [status]);

  function update<K extends keyof Enquiry>(key: K, value: Enquiry[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: validateEnquiry(next)[key] }));
    if (status === 'error') setStatus('idle');
  }
  function attributes(name: keyof Enquiry) {
    return {
      id: name,
      name,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
      onBlur: () =>
        setErrors((previous) => ({ ...previous, [name]: validateEnquiry(values)[name] })),
    };
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[id="${firstError}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus('sending');
    try {
      setStatus(await submitEnquiry(values, endpoint));
    } catch (error) {
      setDeliveryError(
        error instanceof Error && error.message.startsWith('We could')
          ? error.message
          : 'Connection interrupted. Your details are still here. Please try again.'
      );
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  if (status === 'demo' || status === 'sent')
    return (
      <div
        className="self-start border-t-[3px] border-green bg-sage p-11 mobile:p-7 [&_.button]:mt-7 [&_h2]:text-[38px] [&_h2]:wrap-anywhere [&>p:not(.eyebrow)]:mt-4.5 [&>p:not(.eyebrow)]:text-sm [&>svg]:mb-6 [&>svg]:text-green"
        ref={resultRef}
        tabIndex={-1}
        role="status"
      >
        <CheckCircle2 size={40} strokeWidth={1.4} aria-hidden="true" />
        <p className="eyebrow mb-4 font-body text-[11px] leading-[1.6] font-semibold text-accent mobile:text-[10px]">
          {status === 'demo' ? 'DEMO COMPLETE' : 'THANK YOU'}
        </p>
        <h2>
          {status === 'demo' ? 'Looking good, ' : 'Enquiry received, '}
          {values.name.trim().split(/\s+/)[0]}.
        </h2>
        <p>
          {status === 'demo'
            ? 'Your enquiry passed validation. This is a demo, so no message was sent and your details were not stored.'
            : 'Thank you for sharing your occasion with us. Our team will be in touch using the email you provided.'}
        </p>
        <button
          className="button inline-flex min-h-[50px] items-center justify-center gap-3.5 rounded-sm border border-line bg-transparent px-[22px] py-[13px] text-center text-[13px] leading-normal font-medium text-green transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-green hover:bg-sage active:translate-y-0"
          type="button"
          onClick={() => {
            setStatus('idle');
            if (status === 'sent') setValues(initialEnquiry(params));
            requestAnimationFrame(() => document.getElementById('name')?.focus());
          }}
        >
          <RotateCcw size={16} aria-hidden="true" />
          {status === 'demo' ? 'Edit enquiry' : 'Start another enquiry'}
        </button>
      </div>
    );

  return (
    <form
      className="border-l border-line pl-11 laptop:pl-[30px] tablet:border-t tablet:border-l-0 tablet:px-0 tablet:pt-10"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
      aria-label="Event enquiry"
      aria-busy={status === 'sending'}
    >
      <div className="mb-[30px] [&_h2]:mb-2.5 [&_h2]:text-[32px] mobile:[&_h2]:text-[30px] [&_p]:text-xs">
        <h2>Your occasion, your way.</h2>
        <p>
          {endpoint
            ? 'Tell us a little about what you have in mind.'
            : 'Demo enquiry. No information will be sent or stored.'}
        </p>
      </div>
      <ConfigProvider componentDisabled={status === 'sending'}>
        <fieldset disabled={status === 'sending'}>
          <legend className="sr-only">Your details and event</legend>
          <div className="grid grid-cols-2 gap-x-5 mobile:grid-cols-1">
            <Field name="name" label="Your name" error={errors.name}>
              <Input
                {...attributes('name')}
                status={errors.name ? 'error' : undefined}
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                autoComplete="name"
                placeholder="Full name"
                required
                maxLength={100}
              />
            </Field>
            <Field name="email" label="Email address" error={errors.email}>
              <Input
                {...attributes('email')}
                status={errors.email ? 'error' : undefined}
                type="email"
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
              />
            </Field>
            <Field name="phone" label="Phone number" optional error={errors.phone}>
              <Input
                {...attributes('phone')}
                status={errors.phone ? 'error' : undefined}
                type="tel"
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                autoComplete="tel"
                placeholder="+233"
                maxLength={25}
              />
            </Field>
            <Field name="event" label="The occasion" error={errors.event}>
              <Select
                {...attributes('event')}
                status={errors.event ? 'error' : undefined}
                value={values.event || undefined}
                onChange={(value: string) => update('event', value)}
                placeholder="Choose your occasion"
                aria-required="true"
                virtual={false}
                options={eventTypes.map((item) => ({ value: item, label: item }))}
              />
            </Field>
            <Field name="date" label="Event date" optional error={errors.date}>
              <DatePicker
                {...attributes('date')}
                status={errors.date ? 'error' : undefined}
                minDate={dayjs(todayLocal())}
                format="YYYY-MM-DD"
                value={values.date ? dayjs(values.date) : null}
                onChange={(value) => update('date', value ? value.format('YYYY-MM-DD') : '')}
                placeholder="Select a date"
              />
            </Field>
            <Field name="guests" label="Number of guests" optional error={errors.guests}>
              <InputNumber
                {...attributes('guests')}
                status={errors.guests ? 'error' : undefined}
                min={1}
                max={10000}
                step={1}
                value={values.guests ? Number(values.guests) : null}
                changeOnBlur={false}
                onInput={(text) => update('guests', text)}
                onChange={(value) => update('guests', value === null ? '' : String(value))}
                placeholder="Your best estimate"
              />
            </Field>
          </div>
          <Field name="package" label="Preferred package" optional>
            <Select
              id="package"
              value={values.package}
              onChange={(value: string) => update('package', value)}
              virtual={false}
              options={[
                { value: '', label: "Let's decide together" },
                ...packages.map((item) => ({ value: item.name, label: item.name })),
              ]}
            />
          </Field>
          <Field name="message" label="Tell us about your plans" error={errors.message}>
            <Input.TextArea
              {...attributes('message')}
              status={errors.message ? 'error' : undefined}
              rows={5}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder="Your vision, location, favourite flavours, dietary needs..."
              required
              maxLength={3000}
            />
          </Field>
          <div className="mt-0.5 mb-6 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper]:cursor-pointer [&_.ant-checkbox-wrapper]:items-start [&_.ant-checkbox-wrapper]:gap-2.5 [&_.ant-checkbox-wrapper]:text-xs [&_.ant-checkbox-wrapper]:text-muted">
            <Checkbox
              {...attributes('consent')}
              checked={values.consent}
              onChange={(event) => update('consent', event.target.checked)}
              required
            >
              I agree to be contacted about this enquiry.
            </Checkbox>
            {errors.consent && (
              <p id="consent-error" className="field-error mt-1.5 text-[11px] text-error">
                {errors.consent}
              </p>
            )}
          </div>
        </fieldset>
      </ConfigProvider>
      <div aria-live="polite">
        {status === 'error' && (
          <p
            className="mb-4.5 border-l-[3px] border-error bg-error-bg p-3.5 text-[13px] text-error"
            role="alert"
          >
            {deliveryError}
          </p>
        )}
        {Object.values(errors).some(Boolean) && (
          <p className="mt-1.5 mb-4.5 text-[11px] text-error">
            Please check the highlighted fields.
          </p>
        )}
      </div>
      <button
        className="button inline-flex min-h-[50px] items-center justify-center gap-3.5 rounded-sm border border-green bg-green px-[22px] py-[13px] text-center text-[13px] leading-normal font-medium text-paper transition-[background,border-color,transform] duration-180 ease-[ease] hover:-translate-y-0.5 hover:border-green-hover hover:bg-green-hover active:translate-y-0"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
            Sending enquiry
          </>
        ) : (
          <>
            {endpoint ? 'Send your enquiry' : 'Preview enquiry'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-4.5 text-[10px]">
        A conversation is the first step. Your date is confirmed only when we agree the details
        together.
      </p>
    </form>
  );
}
