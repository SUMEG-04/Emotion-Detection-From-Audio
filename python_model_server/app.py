from flask import Flask, request, jsonify
import numpy as np
from tensorflow import keras
load_model = keras.models.load_model
from utils.audio_processing import extract_features  # Updated function for spectrogram extraction

# Initialize the Flask app
app = Flask(__name__)

# Load the saved CNN model
model = load_model('model/emotion_cnn_model.h5')

# Emotion labels
EMOTION_LABELS = ['neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgust', 'surprised']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    # Save the file locally
    file = request.files['file']
    print(file)
    file_path = "temp_audio.wav"
    file.save(file_path)

    # Extract spectrogram features and reshape for model input
    features = extract_features(file_path)
    if features is None:
        return jsonify({'error': 'Feature extraction failed'}), 500
    features = np.expand_dims(features, axis=0)  # Reshape for model input (1, 128, 128, 3)

    # Make prediction
    prediction = model.predict(features)
    predicted_index = np.argmax(prediction, axis=1)[0]  # Get the index of the highest probability
    predicted_emotion = EMOTION_LABELS[predicted_index]

    return jsonify({'emotion': predicted_emotion})

if __name__ == '__main__':
    app.run(debug=True)
