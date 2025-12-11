document.getElementById('captureBtn').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    console.log('Capturing:', url);
    document.getElementById('result').innerHTML = 
        `<p>⏳ Generating short link for: <strong>${url}</strong></p>`;
});
