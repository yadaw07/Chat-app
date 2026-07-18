export function isNonEmptyString(value, maxLength = 1000) {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

export function isValidRoomId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{1,50}$/.test(value);
}
