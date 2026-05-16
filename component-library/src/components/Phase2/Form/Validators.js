// Yeh functions pure hain — koi side effects nahi
// Har ek string return karta hai (error) ya undefined (valid)

export const required = (msg = 'This field is required') =>
  (value) => {
    if (!value || !String(value).trim()) return msg;
  };

export const email = (msg = 'Enter a valid email address') =>
  (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) return msg;
  };

export const minLength = (min, msg) =>
  (value) => {
    if (value && value.length < min)
      return msg ?? `Must be at least ${min} characters`;
  };

export const maxLength = (max, msg) =>
  (value) => {
    if (value && value.length > max)
      return msg ?? `Must be ${max} characters or less`;
  };

export const matches = (fieldName, msg = 'Fields do not match') =>
  (value, allValues) => {
    if (value !== allValues[fieldName]) return msg;
  };

export const pattern = (regex, msg = 'Invalid format') =>
  (value) => {
    if (value && !regex.test(value)) return msg;
  };

// ── Compose multiple validators ──
export function composeValidators(...validators) {
  return (value, allValues) => {
    for (const validator of validators) {
      const error = validator(value, allValues);
      if (error) return error;
    }
  };
}

// ── Build validate function for useForm ──
export function buildValidate(rules) {
  return (values) => {
    const errors = {};
    for (const [field, validator] of Object.entries(rules)) {
      const error = validator(values[field], values);
      if (error) errors[field] = error;
    }
    return errors;
  };
}