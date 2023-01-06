import ReactHtmlParser from 'react-html-parser';

const charMatch = ({ result, query }: any) => {
  const regEx = new RegExp(query, 'gi');
  const html = result.replace(regEx, '<strong>$&</strong>');
  return ReactHtmlParser(html);
}

export { charMatch }