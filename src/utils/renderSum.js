export default function renderSum(_, record) {
  return (record.quantity * record.price).toLocaleString("de-CH");
}
