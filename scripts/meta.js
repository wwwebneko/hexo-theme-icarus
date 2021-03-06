/**
* Meta Helper
* @description Generate meta tags for HTML header
* @example
*     <%- meta(post) %>
*/
function trim (str) {
  return str.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

function split (str, sep) {
  const result = [];
  const matched = sep.exec(str);
  result.push(matched[0]);
  return result;
}

hexo.extend.helper.register('meta', ({ meta }) => {
  const metas = meta || [];
  const metaDOMArray = metas.map(meta => {
    const entities = split(meta, /(?:[^\\;]+|\\.)+/g);
    const entityArray = entities
      .map(entity => {
        const keyValue = split(entity, /(?:[^\\=]+|\\.)+/g);
        if (keyValue.length < 2) {
          return null;
        }
        const key = trim(keyValue[0]);
        const value = trim(keyValue[1]);
        return `${key}="${value}"`;
      })
      .filter(entity => entity);
    return `<meta ${entityArray.join(' ')} />`;
  });
  return metaDOMArray.join('\n');
});
