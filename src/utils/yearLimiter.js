/**
 *
 * @description takes YYYYYY-MM-DD string and trims excess year digits
 */
export default function yearLimiter(dateString) {
  const [year, month, day] = dateString.split("-");
  const fourDigitYear = year.slice(0, 4);
  const correctDateString = [fourDigitYear, month, day].join("-");
  return correctDateString;
}
