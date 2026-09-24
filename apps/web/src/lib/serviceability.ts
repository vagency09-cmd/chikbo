import { useQuery } from '@tanstack/react-query';
import type { ServiceabilityDto } from '@chikbo/shared';
import { api } from './api';
import { PINCODE_RE } from './format';

const REMEMBER_KEY = 'chikbo.pincode';

/** The pincode the shopper last checked (PDP) or typed at checkout, for prefilling. */
export function rememberedPincode(): string {
  try {
    const v = localStorage.getItem(REMEMBER_KEY) ?? '';
    return PINCODE_RE.test(v) ? v : '';
  } catch {
    return '';
  }
}

export function rememberPincode(pincode: string): void {
  try {
    if (PINCODE_RE.test(pincode)) localStorage.setItem(REMEMBER_KEY, pincode);
  } catch {
    // Private mode / blocked storage: nothing to remember, nothing to break.
  }
}

/**
 * Delivery check for a pincode — runs on its own as soon as the pincode is a
 * valid 6 digits, so nobody has to press "Check". The server caches answers
 * for a day; we keep them for the session.
 */
export function useServiceability(pincode: string | null | undefined) {
  const value = (pincode ?? '').trim();
  const valid = PINCODE_RE.test(value);
  return useQuery({
    queryKey: ['serviceability', valid ? value : null],
    queryFn: () => api<ServiceabilityDto>('/catalog/serviceability', { query: { pincode: value } }),
    enabled: valid,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}

/** "in about 3 days" / "" — shared wording for the ETA. */
export function etaText(result: ServiceabilityDto | undefined): string {
  if (!result?.serviceable || typeof result.etaDays !== 'number') return '';
  return `in about ${result.etaDays} ${result.etaDays === 1 ? 'day' : 'days'}`;
}
