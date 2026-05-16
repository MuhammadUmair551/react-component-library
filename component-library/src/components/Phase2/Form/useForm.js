import { useState, useCallback } from 'react';

export function useForm({
  initialValues = {},
  validate,
  onSubmit,
}) {
  const [values,       setValues]       = useState(initialValues);
  const [errors,       setErrors]       = useState({});
  const [touched,      setTouched]      = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  // ── Validate all fields ──
  const runValidation = useCallback((vals) => {
    if (!validate) return {};
    return validate(vals) ?? {};
  }, [validate]);

  // ── Handle input change ──
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: newVal }));

    // Real-time validation sirf touched fields pe
    if (touched[name]) {
      const newValues = { ...values, [name]: newVal };
      const newErrors = runValidation(newValues);
      setErrors(prev => ({
        ...prev,
        [name]: newErrors[name],
      }));
    }
  }, [values, touched, runValidation]);

  // ── Handle blur — field touched mark karo ──
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Blur pe validate karo
    const newErrors = runValidation(values);
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name],
    }));
  }, [values, runValidation]);

  // ── Set single field value (programmatically) ──
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // ── Set single field error (programmatically) ──
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // ── Handle submit ──
  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();

    // Sab fields touch karo — errors dikhane ke liye
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    );
    setTouched(allTouched);

    // Validate karo
    const validationErrors = runValidation(values);
    setErrors(validationErrors);

    // Errors hain toh submit mat karo
    const hasErrors = Object.values(validationErrors)
      .some(Boolean);
    if (hasErrors) return;

    // Submit karo
    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
      setIsSubmitted(true);
    } catch (err) {
      // Server errors handle karo
      if (err.fieldErrors) {
        setErrors(prev => ({ ...prev, ...err.fieldErrors }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, runValidation, onSubmit]);

  // ── Reset form ──
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [initialValues]);

  // ── Field props helper — spread karo input pe ──
  const getFieldProps = useCallback((name) => ({
    name,
    value:    values[name] ?? '',
    onChange: handleChange,
    onBlur:   handleBlur,
  }), [values, handleChange, handleBlur]);

  // ── Error check helper ──
  const hasError = useCallback((name) =>
    !!(touched[name] && errors[name]),
  [touched, errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    getFieldProps,
    hasError,
    reset,
  };
}