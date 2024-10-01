import { marked } from './node_modules/marked/lib/marked.esm.js';

const markdownTextarea = document.getElementById('markdown');
const previewDiv = document.getElementById('preview');

const suggestions = [
   { keyword: '**Bold**', text: '**text**' },
   { keyword: '*Italic*', text: '*text*' },
   { keyword: '### Header', text: '### Header' },
   { keyword: '1. Ordered List', text: '1. List item' },
   { keyword: '- Bullet List', text: '- List item' },
];

// Function to update the preview
const updatePreview = () => {
    const markdownText = markdownTextarea.value;
    const html = marked(markdownText); // Convert Markdown to HTML
    previewDiv.innerHTML = html; // Update the preview div
};

// Event listener for the textarea to update the preview
markdownTextarea.addEventListener('input', updatePreview);

// Load and save file event listeners
document.getElementById('load-file').addEventListener('click', async () => {
    const result = await window.electron.openFile();
    if (result) {
        markdownTextarea.value = result.fileContent;
        updatePreview(); // Update the preview after loading the file
    }
});

document.getElementById('save-file').addEventListener('click', async () => {
    const content = markdownTextarea.value;
    await window.electron.saveFile(content);
});

document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

document.getElementById('minimize').addEventListener('click', () => {
    window.electron.minimize();
});

document.getElementById('maximize').addEventListener('click', () => {
    window.electron.maximize();
});

document.getElementById('close').addEventListener('click', () => {
    window.electron.close();
});
