export default function renderDate(text) {
  return new Date(text).toLocaleDateString("rus");
}
