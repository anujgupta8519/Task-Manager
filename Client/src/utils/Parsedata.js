export const parseData=(err)=>{
    const parser = new DOMParser();
    const doc = parser.parseFromString(err.response.data, 'text/html');
    const preTagContent = doc.querySelector('pre').textContent;
   // console.log(preTagContent);
    console.log(preTagContent)

    return preTagContent.substring(0,preTagContent.indexOf('at'))
}