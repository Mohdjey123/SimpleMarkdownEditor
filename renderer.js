const { marked } = require('marked');

const markdownTextarea = document.getElementById('markdown');
const previewDiv = document.getElementById('preview');

markdownTextarea.addEventListener('input', () => {
    const markdownText = markdownTextarea.value;
    const html = marked(markdownText);
    previewDiv.innerHTML = html;
});
