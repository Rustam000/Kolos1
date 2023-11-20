export default function renderUnit(text) {
  switch (text) {
    case "item":
      return "Штука";
    case "kilogram":
      return "Кг";
    case "liter":
      return "Литр";

    default:
      return text;
  }
}
