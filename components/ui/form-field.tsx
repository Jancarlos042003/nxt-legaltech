import { forwardRef, InputHTMLAttributes } from "react";
import Label from "./label";
import Input from "./input";

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <Input ref={ref} id={id} error={error} className="mt-1" {...props} />
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
