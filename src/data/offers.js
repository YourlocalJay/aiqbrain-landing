/**
 * AIQBrain offers configuration
 * Manages all CPA/affiliate offers with tracking, fallbacks, and expiry dates
 */
export const offers = {
  "survey-vault-us-m": {
    id: "sv-us-m",
    name: "US Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/us-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-ca-m": {
    id: "sv-ca-m",
    name: "CA Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/ca-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-uk-m": {
    id: "sv-uk-m",
    name: "UK Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/uk-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-au-m": {
    id: "sv-au-m",
    name: "AU Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/au-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-de-m": {
    id: "sv-de-m",
    name: "DE Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/de-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-global-m": {
    id: "sv-global-m",
    name: "Global Mobile Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/global-m?t=NEURAL_OPS&src=direct&m=referral",
    fallback: null, // No fallback - never use AliExpress
    active: true,
    expiry: "2025-12-31"
  },
  // Desktop offers
  "survey-vault-us-d": {
    id: "sv-us-d",
    name: "US Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/us-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-ca-d": {
    id: "sv-ca-d",
    name: "CA Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/ca-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-uk-d": {
    id: "sv-uk-d",
    name: "UK Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/uk-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-au-d": {
    id: "sv-au-d",
    name: "AU Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/au-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-de-d": {
    id: "sv-de-d",
    name: "DE Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/de-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=fallback",
    active: true,
    expiry: "2025-12-31"
  },
  "survey-vault-global-d": {
    id: "sv-global-d",
    name: "Global Desktop Survey Vault",
    url: "https://trkr.aiqbrain.com/sv/global-d?t=NEURAL_OPS&src=direct&m=referral",
    fallback: null, // No fallback - never use AliExpress
    active: true,
    expiry: "2025-12-31"
  }
};
