export default function renderUnit(text) {
  switch (text) {
    case "item":
      return "Штука";
    case "kilogram":
      return "Килограмм";
    case "liter":
      return "Литр";

    default:
      return text;
  }
}
