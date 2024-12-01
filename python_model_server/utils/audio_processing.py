import librosa
import numpy as np

def extract_features(file_path, fixed_width=128, n_mels=128):
    """Enhanced feature extraction with additional audio features."""
    try:
        # Load audio file
        y, sr = librosa.load(file_path, sr=None)
        
        # Extract multiple features
        mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        
        # Add additional features
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        
        # Combine features
        combined_features = np.concatenate([mel_spec_db, mfcc, chroma], axis=0)
        
        # Normalize
        combined_features = (combined_features - np.mean(combined_features)) / np.std(combined_features)
        
        # Resize to fixed width
        if combined_features.shape[1] < fixed_width:
            pad_width = fixed_width - combined_features.shape[1]
            combined_features = np.pad(combined_features, ((0, 0), (0, pad_width)), mode='constant')
        else:
            combined_features = combined_features[:, :fixed_width]
        
        # Resize to match input shape
        combined_features = np.resize(combined_features, (128, fixed_width))
        return combined_features[..., np.newaxis]  # Add channel dimension
        
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return None
