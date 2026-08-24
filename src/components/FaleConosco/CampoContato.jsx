export default function CampoContato({
  id,
  label,
  error,
  children,
}) {
  return (
    <div className="campo-form">
      <label htmlFor={id}>
        {label}
      </label>

      {children}

      {error && (
        <div
          id={`erro-${id}`}
          className="invalid-feedback"
        >
          {error}
        </div>
      )}
    </div>
  );
}