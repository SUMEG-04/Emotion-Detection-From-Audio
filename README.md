# Emotion Detection from Audio

This project uses deep learning and speech processing techniques to detect emotions from audio files. It classifies emotions like happy, sad, angry, neutral, and others based on audio speech input.

## Project Description

Emotion Detection from Audio is a machine learning model that processes speech data to predict the emotional tone behind it. The project leverages Mel-frequency cepstral coefficients (MFCCs) to extract features from audio files, which are then used to train a deep learning model. The system is capable of classifying emotions into several categories, such as:
- **Anger**
- **Happiness**
- **Sadness**
- **Fear**
- **Neutral**
- **Surprise**

The model is trained on the RAVDESS and CREMA-D datasets, which contain labeled audio samples of human emotions. The system can predict emotions for both short and long audio clips.

## Technologies Used

- **Python** – Programming language for building the model.
- **Librosa** – A Python package for audio processing and feature extraction.
- **TensorFlow/Keras** – For building and training the neural network.
- **Flask** – Web framework to expose the model as an API.
- **NumPy/Pandas** – Data manipulation and processing.
- **Matplotlib** – For visualizing data and results.

## Requirements

Before running the project, make sure you have the following dependencies installed:

### System Requirements

- Python 3.x
- A modern browser for the web interface

### Python Libraries

```bash
pip install flask
pip install tensorflow
pip install librosa
pip install numpy
pip install pandas
pip install matplotlib
pip install scikit-learn
```

## Datasets Used

- **RAVDESS Dataset** – Contains emotional speech from professional actors.
- **CREMA-D Dataset** – Contains thousands of speech clips from diverse actors and emotions.
- 
## How to Use
**Step 1:** Clone the Repository
```
git clone https://github.com/yourusername/emotion-detection-from-audio.git
cd emotion-detection-from-audio
```
**Step 2:** Train the Model
Prepare the Dataset

Download the RAVDESS or CREMA-D dataset and store it in the datasets folder.
Preprocess the audio files and extract MFCC features.
Train the Model

Run the model training script:
```bash
python train_model.py
```
The model will be saved in the model/ directory once trained.

**Step 3:** Run the Flask API
Start the Flask Application
Run the Flask API server to expose the emotion detection model as an API:

```bash
python app.py
```
Make API Calls
Once the server is running, you can upload audio files and get emotion predictions using the API:

Endpoint: POST /predict
Input: Audio file in .wav or .mp3 format
Response: Predicted emotion label
Example Request (using Postman or CURL):

```bash
curl -X POST -F "file=@path_to_audio_file.wav" http://localhost:5000/predict
```
**Step 4:** Web Interface (Optional)
You can also interact with the system via a basic frontend built using HTML and JavaScript. To run the frontend:

```bash
cd frontend
npm install
npm start
```
Now, you can open http://localhost:3000 in your browser to upload an audio file and get emotion predictions.

## Results
After training, the model can predict emotions with an accuracy of around 80% (depending on dataset size and model architecture).

## Challenges & Limitations
**Data Quality:** Some audio clips may have background noise or unclear speech, which could impact accuracy.
**Model Generalization:** The model works best on emotions that are well-represented in the dataset. For unseen data, performance might drop.
## Future Improvements
**Larger Datasets** – Integrating more diverse datasets to improve model generalization.
**Real-Time Emotion Recognition** – Improving the system to process live audio streams instead of file uploads.
**Better Model Architecture** – Exploring advanced deep learning models like CNN-LSTM for better accuracy.
## Contributing
Feel free to fork the repository, create issues, and submit pull requests. Contributions are always welcome!

## License
This project is licensed under the MIT License.

## Contact
Sumeg Yogram Sharnagat
GitHub: https://github.com/SUMEG-04


---

### **Explanation of Sections:**

1. **Project Description**: Provides a brief overview of what the project is and how it works, including the emotional categories and technologies used.

2. **Technologies Used**: Lists the core technologies, libraries, and tools used in the project (e.g., TensorFlow for the model, Flask for the API, etc.).

3. **Requirements**: Specifies the required Python libraries and datasets to run the project.

4. **How to Use**: Offers detailed steps on setting up the project, training the model, running the Flask server, and interacting with the system via the API.

5. **Results**: Describes the expected performance and challenges that the model may encounter.

6. **Future Improvements**: Suggests ideas for improving the model and functionality.

7. **License and Contact**: Specifies licensing and contact details for contributors or users of the project.

This README provides all the necessary details to get started with the project and also clarifies its functionalities, limitations, and future scope.





