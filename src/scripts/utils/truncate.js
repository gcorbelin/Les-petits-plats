/**
 * Truncate given string to a given max length and add "..." at the end if needed
 * @param {String} str String to truncate
 * @param {Number} maxLength Max string length
 * @returns truncated string
 */
function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  //trim the string to the maximum length
  let trimmedString = str.substr(0, maxLength);

  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return trimmedString + "...";
}

export default truncateString;
