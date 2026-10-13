/*
 * Copied from Builds/Operations/meta-ads/tracking/pixel.js (2026-10-13), served at /js/uc-pixel.js.
 * One change: trackLead(id) takes the event_id the form already sent to the server, so the
 * browser Lead and the server CAPI Lead share it and dedup. With no id it makes one, as before.
 *
 * UnderCurrent — Meta Pixel, consent-gated.
 * Vanilla JS so it drops into any page (Next.js: load via <Script strategy="afterInteractive">).
 * Privacy Act / APP: the Pixel must NOT fire before the visitor grants ad_storage consent.
 * We init the Pixel with consent REVOKED, so fbq queues nothing until ucPixel.grantConsent() runs.
 *
 * Wiring:
 *   1. Set window.__META_PIXEL_ID__ = '<your pixel id>' before this script (Next: from
 *      NEXT_PUBLIC_META_PIXEL_ID). Do NOT hardcode the id here.
 *   2. On consent "accept", call ucPixel.grantConsent()  -> fires PageView.
 *   3. On the lead form submit, call ucPixel.trackLead()  -> returns the event_id; send that SAME
 *      event_id to the CAPI route (via n8n) so the browser + server events dedup.
 */
(function (w, d) {
  var PIXEL_ID = w.__META_PIXEL_ID__;
  if (!PIXEL_ID) {
    // No id wired yet — expose no-op stubs so callers don't throw.
    w.ucPixel = {
      grantConsent: function () {},
      revokeConsent: function () {},
      trackLead: function () { return null; },
    };
    return;
  }

  // ── Standard Meta Pixel bootstrap ──────────────────────────────────────────
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(w, d, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // Hold ALL events until the visitor consents (Meta consent mode).
  w.fbq('consent', 'revoke');
  w.fbq('init', PIXEL_ID);
  // NB: no PageView here — it fires on grantConsent().

  function uuid() {
    if (w.crypto && w.crypto.randomUUID) return w.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  w.ucPixel = {
    grantConsent: function () {
      w.fbq('consent', 'grant');
      w.fbq('track', 'PageView');
    },
    revokeConsent: function () {
      w.fbq('consent', 'revoke');
    },
    /**
     * Fire the Lead event with a fresh event_id and return it.
     * Pass the returned id to the CAPI call so the two copies dedup.
     */
    trackLead: function (id) {
      var eventId = id || uuid();
      w.fbq('track', 'Lead', { currency: 'AUD', value: 0 }, { eventID: eventId });
      return eventId;
    },
  };
})(window, document);
