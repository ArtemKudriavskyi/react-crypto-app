export default function percentDifference(oldValue, newValue) {
  // return (((newValue - oldValue) / oldValue) * 100).toFixed(2);
   return( 100 *Math.abs((oldValue - newValue) / ((oldValue + newValue) / 2))).toFixed(2);
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}