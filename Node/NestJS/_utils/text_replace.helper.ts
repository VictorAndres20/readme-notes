export const replace_accents = (text: string) => {
  return text
    .replace(/[Á]/g, 'A')
    .replace(/[É]/g, 'E')
    .replace(/[Í]/g, 'I')
    .replace(/[Ó]/g, 'O')
    .replace(/[Ú]/g, 'U');
};

export const addExtraZeros = (text: string, maxLength: number) => {
  const textLength = text.length;
  if (maxLength > textLength) {
    const extraLength = maxLength - textLength;
    const extraText = Array.from({ length: extraLength }).reduce(
      (acc) => (acc += '0'),
      ''
    );

    return `${extraText}${text}`;
  }

  return text;
};

export const addPostSpaces = (text: string, maxLength: number) => {
  const textLength = text.length;
  if (maxLength > textLength) {
    const extraLength = maxLength - textLength;
    const extraText = Array.from({ length: extraLength }).reduce(
      (acc) => (acc += ' '),
      ''
    );

    return `${text}${extraText}`;
  }

  return text.slice(0, maxLength);
};

export const removeAccents = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
