// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormErrors(props: { formErrors: any }): JSX.Element {
  return (
    <div className="formErrors">
      {Object.keys(FormErrors)
        .filter((fieldName) => props.formErrors[fieldName].length > 0)
        .map((fieldName, i) => (
          <p key={fieldName.concat(i.toString())}>
            {fieldName} {props.formErrors[fieldName]}
          </p>
        ))}
    </div>
  );
}
