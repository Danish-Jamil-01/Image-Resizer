document.addEventListener('DOMContentLoaded', () => {

    // --- 3D Background Logic ---

    if (typeof THREE === 'undefined') {
        console.error('Three.js has not been loaded!');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    const shapes = [];

    // Create a new, modern "Lathe" geometry (vase-like shape)
    const points = [];
    for (let i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.5 + 0.5, (i - 5) * 0.4));
    }
    const latheGeometry = new THREE.LatheGeometry(points);

    // Define the list of modern geometries to use
    const modernGeometries = [
        new THREE.TorusKnotGeometry(1.2, 0.3, 128, 16), // High-res entangled rope
        latheGeometry // The new abstract shape
    ];

    // Create and distribute a large number of random 3D objects
    for (let i = 0; i < 50; i++) { // Increased object count
        // Randomly select a geometry for each object
        const geometry = modernGeometries[Math.floor(Math.random() * modernGeometries.length)];
        const shape = new THREE.Mesh(geometry, material);

        // Scatter objects across a much wider area to fill the screen
        shape.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
        );
        
        shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        const scale = Math.random() * 0.4 + 0.2;
        shape.scale.set(scale, scale, scale);

        shapes.push(shape);
        scene.add(shape);
    }

    camera.position.z = 10; // Moved camera back to see the wider scene

    const animate = () => {
        requestAnimationFrame(animate);
        shapes.forEach(shape => {
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.002;
        });
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });


    // --- Image Resizer Logic ---

    const imageInput = document.getElementById('image-input');
    const uploadBox = document.getElementById('upload-box');
    const uploadLabel = document.querySelector('.upload-label');
    const previewImage = document.getElementById('preview-image');
    const originalDimensionsEl = document.getElementById('original-dimensions');
    
    const optionsBox = document.getElementById('options-box');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const aspectRatioLock = document.getElementById('aspect-ratio-lock');
    const resizeBtn = document.getElementById('resize-btn');

    const downloadBox = document.getElementById('download-box');
    const outputCanvas = document.getElementById('output-canvas');
    const downloadBtn = document.getElementById('download-btn');

    let originalImage = null;
    let originalAspectRatio = 1;

    // uploadBox.addEventListener('click', () => imageInput.click()); // <-- THIS LINE IS REMOVED

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                originalAspectRatio = originalImage.width / originalImage.height;
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                originalDimensionsEl.textContent = `Original: ${originalImage.width}px × ${originalImage.height}px`;
                originalDimensionsEl.style.display = 'block';
                uploadLabel.style.display = 'none';
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                optionsBox.classList.remove('hidden');
                downloadBox.classList.add('hidden');
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    widthInput.addEventListener('input', () => {
        if (aspectRatioLock.checked) {
            heightInput.value = Math.round(widthInput.value / originalAspectRatio);
        }
    });
    heightInput.addEventListener('input', () => {
        if (aspectRatioLock.checked) {
            widthInput.value = Math.round(heightInput.value * originalAspectRatio);
        }
    });

    resizeBtn.addEventListener('click', () => {
        if (!originalImage) return;
        const newWidth = parseInt(widthInput.value);
        const newHeight = parseInt(heightInput.value);
        if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
            alert('Please enter valid width and height.');
            return;
        }
        outputCanvas.width = newWidth;
        outputCanvas.height = newHeight;
        const ctx = outputCanvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
        downloadBox.classList.remove('hidden');
        outputCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadBtn.href = url;
        }, 'image/png');
    });
});