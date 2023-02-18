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
