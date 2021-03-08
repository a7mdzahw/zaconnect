import React from "react";

const Input = ({
  id,
  label,
  type = "text",
  onChange,
  className = "",
  value,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`form-control ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
