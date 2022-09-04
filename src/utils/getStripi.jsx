import { loadStripe } from '@stripe/stripe-js';

let stripi;

export default async function getStripi() {

  if (!stripi) {
    stripi = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`)
  }

  return stripi;
}