import KolosModal from "../KolosModal/KolosModal";
import CustomButton from "../UI/CustomButton/CustomButton";

export default function CustomModal({
  message = "I'm a default message. Change me!",
  primaryLabel = "Да",
  secondaryLabel = "Нет",
  primaryAction = () => console.log(primaryLabel),
  secondaryAction = () => console.log(secondaryLabel),
}) {
  return (
    <KolosModal message={message}>
      <CustomButton variant="primary" onClick={primaryAction}>
        {primaryLabel}
      </CustomButton>
      <CustomButton variant="secondary" onClick={secondaryAction}>
        {secondaryLabel}
      </CustomButton>
    </KolosModal>
  );
}