const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const FLASK_API_URL = 'http://127.0.0.1:5000/predict';

async function getPrediction(audioFilePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(audioFilePath));

    const response = await axios.post(FLASK_API_URL, form, {
        headers: { ...form.getHeaders() },
    });

    return response.data.emotion;
}

module.exports = { getPrediction };
