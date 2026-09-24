import { PINCODE_RE } from '../lib/format';
import { etaText, useServiceability } from '../lib/serviceability';
import { TruckIcon } from './icons';

interface Props {
  pincode: string | null | undefined;
  /** Shown before a valid pincode exists. */
  prompt?: string;
}

/**
 * One line under a delivery address: checks the pincode automatically and
 * says whether (and roughly when) Chikbo can deliver there.
 */
export function DeliveryCheck({ pincode, prompt = 'Enter a pincode to see the delivery estimate.' }: Props) {
  const value = (pincode ?? '').trim();
  const valid = PINCODE_RE.test(value);
  const check = useServiceability(valid ? value : null);

  let tone: 'muted' | 'ok' | 'error' = 'muted';
  let text = prompt;
  if (valid && check.isPending) {
    text = `Checking delivery to ${value}…`;
  } else if (valid && check.isError) {
    text = 'Could not check delivery just now — you can still place the order.';
  } else if (valid && check.data) {
    if (check.data.serviceable) {
      tone = 'ok';
      const eta = etaText(check.data);
      text = `Delivers to ${value}${eta ? ` ${eta}` : ''} · Prepaid only`;
    } else {
      tone = 'error';
      text = check.data.message || `Sorry, we can't deliver to ${value} yet. Try a nearby pincode.`;
    }
  }

  return (
    <p className={`delivery-check delivery-check--${tone}`} aria-live="polite">
      <TruckIcon size={16} />
      <span>{text}</span>
    </p>
  );
}
