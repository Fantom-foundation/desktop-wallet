export const ALL_TX = 'All';
export const SENT_TX = 'Sent';
export const RECEIVED_TX = 'Received';
export const SAME_ACCOUNT_ERROR_TEXT = 'You can not send funds to yourself.';
export const LOADER_COLOR = '#549aec';

/**
 * @method toFixed : Function to round off number value
 *
 * @param num : Number to be rounded.
 * @param fixed :  Count of decimal position upto which 'num' is rounded.
 */
export function toFixed(num, fixed) {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
}
