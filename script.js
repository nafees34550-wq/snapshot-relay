document.getElementById('captureBtn').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultDiv = document.getElementById('result');

    // Clear previous results
    resultDiv.innerHTML = '';

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/i;
    if (!urlPattern.test(urlInput)) {
        resultDiv.innerHTML = `<p style="color: red;">❌ Please enter a valid URL (e.g., https://example.com)</p>`;
        return;
    }

    // Show loading message
    resultDiv.innerHTML = `<p style="color: green;">📸 Capturing screenshot of <strong>${urlInput}</strong>...</p>`;

    // Simulate API call (MOCK — we replace with real backend later)
    setTimeout(() => {
        const mockShortCode = Math.random().toString(36).substring(7);
        const mockShortLink = `https://snaprl.xyz/${mockShortCode}`;
        resultDiv.innerHTML = `
            <p style="color: green;">✅ Screenshot captured!</p>
            <p>Your snapshot link:</p>
            <a href="${mockShortLink}" target="_blank" style="
                display: inline-block;
                background: black;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 10px;
            ">${mockShortLink}</a>
            <p><small>This is a mock link. Real backend coming next.</small></p>
        `;
    }, 2000); // 2-second delay
});
