import { useEffect, useState } from 'react';
import { ApiError } from '../lib/api';
import { PINCODE_RE } from '../lib/format';
import { etaText, rememberPincode, rememberedPincode, useServiceability } from '../lib/serviceability';
import { TruckIcon } from './icons';

/**
 * Pincode delivery checker on the product page. Checks on its own the moment
 * six digits are in the box (the button only remains for a retry), remembers
 * the pincode so checkout can prefill it, and hides itself entirely if the
 * endpoint is missing so the page degrades silently.
 */
export function PincodeChecker() {
  const [pincode, setPincode] = useState(() => rememberedPincode());
  const [touched, setTouched] = useState(false);
  const valid = PINCODE_RE.test(pincode);
  const check = useServiceability(valid ? pincode : null);
  const result = valid ? check.data : undefined;

  useEffect(() => {
    if (valid) rememberPincode(pincode);
  }, [pincode, valid]);

  const unsupported =
    check.error instanceof ApiError && (check.error.status === 404 || check.error.code === 'NOT_FOUND');
  if (unsupported) return null;

  const invalid = touched && pincode.length > 0 && !valid;

  return (
    <section className="pincode" aria-labelledby="pincode-title">
      <h2 className="pincode-title" id="pincode-title">
        <TruckIcon size={18} />
        Delivery &amp; services
      </h2>
      <form
        className="pincode-form"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (valid) void check.refetch();
        }}
      >
        <label className="visually-hidden" htmlFor="pincode-input">
          Delivery pincode
        </label>
        <input
          id="pincode-input"
          className="input pincode-input"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          aria-invalid={invalid ? true : undefined}
          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={() => setTouched(true)}
        />
        <button type="submit" className="btn btn-secondary btn-sm" disabled={check.isFetching}>
          {check.isFetching ? 'Checking…' : 'Check'}
        </button>
      </form>
      <p className="pincode-result" aria-live="polite">
        {invalid && <span className="pincode-error">Enter a valid 6-digit pincode.</span>}
        {!invalid && valid && check.isPending && <span className="muted">Checking delivery to {pincode}…</span>}
        {!invalid && valid && check.isError && (
          <span className="pincode-error">We could not check delivery just now. Please try again.</span>
        )}
        {!invalid && result && result.serviceable && (
          <>
            <span className="pincode-ok">
              Delivers to {pincode}
              {etaText(result) ? ` ${etaText(result)}` : ''}
            </span>
            <span className="muted"> · Prepaid orders only</span>
          </>
        )}
        {!invalid && result && !result.serviceable && (
          <span className="pincode-error">{result.message || 'We do not deliver to this pincode yet.'}</span>
        )}
        {!invalid && !valid && (
          <span className="muted">Pan-India shipping · dispatched in 1–2 business days</span>
        )}
      </p>
    </section>
  );
}
