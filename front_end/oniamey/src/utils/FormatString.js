class FormatString {
  static upperCaseFirstLetter = (string) =>
    `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

  static lowerCaseAllWordsExceptFirstLetters = (string) =>
    string.replaceAll(
      /\S*/g,
      (word) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
    );
}

export default FormatString;
