// Apply 3D tilt effect to images, copy button, and GitHub button
const elements = [
    document.getElementById('tilt1'),
    document.getElementById('tilt2'),
    document.getElementById('copy-tilt'),
    document.getElementById('github-tilt')
].filter(el => el); // Filter out null elements (e.g., copy-tilt on changelogs.html)

elements.forEach(el => {
    const height = el.clientHeight;
    const width = el.clientWidth;

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseout', resetTransform);
    el.addEventListener('mousedown', pressDown);
    el.addEventListener('mouseup', pressUp);

    function handleMove(e) {
        const xVal = e.layerX;
        const yVal = e.layerY;
        const yRotation = 20 * ((xVal - width / 2) / width);
        const xRotation = -20 * ((yVal - height / 2) / height);
        const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        el.style.transform = transformString;
    }

    function resetTransform() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }

    function pressDown() {
        el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    }

    function pressUp() {
        el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    }
});

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.previousElementSibling.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    });
});
