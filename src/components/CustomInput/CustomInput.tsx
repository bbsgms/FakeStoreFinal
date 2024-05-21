import { IonInput } from "@ionic/react";
import React from "react";
interface CustomInputProps {
  label: string;
  errorText: string;
  name: string;
  onChange: any;
  onBlur: any;
  value: string;
  hasError: boolean;
}
const CustomInput = (props: CustomInputProps) => {
  const { label, errorText, name, onBlur, onChange, value, hasError } = props;
  return (
    <IonInput
      className={!!hasError ? "ion-invalid ion-touched" : ""}
      name={name}
      label={label}
      value={value}
      labelPlacement="floating"
      errorText={errorText}
      onIonChange={onChange}
      onIonBlur={onBlur}
    ></IonInput>
  );
};

export default CustomInput;
