/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const minLength = (value, min) => {
  return value && value.trim().length >= min;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate contact form
 */
export const validateContactForm = (data) => {
  const errors = {};

  if (!isRequired(data.name)) {
    errors.name = 'Name is required';
  } else if (!minLength(data.name, 2)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!isRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!isRequired(data.message)) {
    errors.message = 'Message is required';
  } else if (!minLength(data.message, 10)) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate prototype form
 */
export const validatePrototypeForm = (data) => {
  const errors = {};

  if (!isRequired(data.title)) errors.title = 'Title is required';
  if (!isRequired(data.businessName)) errors.businessName = 'Business name is required';
  if (!isRequired(data.category)) errors.category = 'Category is required';
  if (!isRequired(data.description)) errors.description = 'Description is required';
  if (data.previewURL && !isValidUrl(data.previewURL)) errors.previewURL = 'Invalid URL format';
  if (data.githubURL && !isValidUrl(data.githubURL)) errors.githubURL = 'Invalid URL format';
  if (data.liveURL && !isValidUrl(data.liveURL)) errors.liveURL = 'Invalid URL format';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
