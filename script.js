let model;
(async function() {
    model = await tf.loadLayersModel('C:\Webre\tfjs_dir\model.json'); // Adjust the path to your model.json
    console.log('Model loaded');
})();

// Handle the image upload and classification
document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) return;

    // Read the image as a tensor
    const reader = new FileReader();
    reader.onload = async function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = async function() {
            // Preprocess the image
            const tensor = tf.browser.fromPixels(img)
                .resizeNearestNeighbor([224, 224])  // Resize according to model's input size
                .toFloat()
                .div(tf.scalar(255.0))
                .expandDims();
            
            // Make a prediction
            const predictions = await model.predict(tensor).data();
            const predictedClass = predictions.indexOf(Math.max(...predictions));

            // Update the DOM with results
            showResults(predictedClass);
        };
    };
    reader.readAsDataURL(file);
});

// Function to show the results based on the prediction
function showResults(predictedClass) {
    const outputImagesDiv = document.getElementById('output-images');
    outputImagesDiv.innerHTML = ''; // Clear previous results

    // Example: Modify this to display the correct images
    const imagePaths = getImagePathsBasedOnPrediction(predictedClass); // Replace with your logic
    imagePaths.forEach(path => {
        const img = document.createElement('img');
        img.src = path;
        img.alt = 'Classified Image';
        outputImagesDiv.appendChild(img);
    });
}

// Function to get image paths based on predicted class
function getImagePathsBasedOnPrediction(predictedClass) {
    // Adjust this according to your use case
    if (predictedClass === 0) {
        return ['C:\Webre\image_result\ 1468_0.jpg', 'C:\Webre\image_result\ 1468_0.jpg'];
    } else if (predictedClass === 1) {
        return ['C:\Webre\image_result\ 1469_0.jpg', 'C:\Webre\image_result\ 1469_0.jpg'];
    }else if (predictedClass === 2) {
        return ['C:\Webre\image_result\ 1470_0.jpg', 'C:\Webre\image_result\ 1470_0.jpg'];
    }else if (predictedClass === 3) {
        return ['C:\Webre\image_result\ 1471_0.jpg', 'C:\Webre\image_result\ 1471_0.jpg'];
    }
    // Add more classes as needed
    return [];
}