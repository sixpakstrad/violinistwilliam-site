export const songRequestSettings = {
  enabled: true,
  requestBoardEnabled: true,
  smsEnabled: false,
  smsPhoneNumber: "",
  googleReviewUrl: "",
  // Keep this page available for direct QR/signage use if needed.
  tipUrl: "/tip",
  // Replace with William's preferred Venmo, PayPal, Stripe, or Square tip link when finalized.
  tipPaymentUrl: "",
  studentInstrumentFundUrl: "/about#instrument-loans",
  storageKey: "winspiration.songRequests",
  enabledStorageKey: "winspiration.songRequests.enabled",
  currentEventStorageKey: "winspiration.songRequests.currentEvent",
} as const;
