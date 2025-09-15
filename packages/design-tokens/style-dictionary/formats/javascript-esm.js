import { fileHeader } from 'style-dictionary/utils';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertTokenToNestedValue = (tokens) => {
  const result = {};

  Object.keys(tokens).forEach((key) => {
    const token = tokens[key];

    // トークンに$valueプロパティがある場合はリーフノード
    if (token.$value !== undefined) {
      result[key] = token.$value;
    }
    // 古い形式のvalueプロパティがある場合もリーフノード
    else if (token.value !== undefined) {
      result[key] = token.value;
    }
    // $typeや$descriptionなどのメタデータプロパティを持つオブジェクトはスキップ
    else if (token.$type || token.$description) {
      // メタデータのみの場合はスキップ
      return;
    }
    // それ以外は中間ノード（ネストされたオブジェクト）
    else {
      const nestedResult = convertTokenToNestedValue(token);
      // 空のオブジェクトでない場合のみ追加
      if (Object.keys(nestedResult).length > 0) {
        result[key] = nestedResult;
      }
    }
  });

  return result;
};

const createJavaScriptEsmFormat = () => ({
  name: 'javascript/esm',
  format: async ({ dictionary, file, platform = {} }) => {
    const header = await fileHeader({ file });
    const { prefix } = platform;
    const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

    const categorizedTokens = Object.entries(tokens).reduce(
      (acc, [category, values]) => {
        acc[category] = values;
        return acc;
      },
      {},
    );

    const exportStrings = Object.entries(categorizedTokens).map(
      ([category, token]) => {
        return `export const ${capitalizeFirstLetter(
          category,
        )} = ${JSON.stringify(convertTokenToNestedValue(token), null, 2)};\n`;
      },
    );

    return header + exportStrings.join('\n');
  },
});

export { createJavaScriptEsmFormat };
