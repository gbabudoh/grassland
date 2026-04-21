export interface ShippingData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface ClaimRewardResult {
  success?: boolean;
  reward?: number;
  newStreak?: number;
  newRank?: string;
  error?: string;
}
