export const ALL_TX = 'All';
export const SENT_TX = 'Sent';
export const RECEIVED_TX = 'Received';

export function toFixed(num, fixed) {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
}
