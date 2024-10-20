
import axios from 'axios';

const pinataApiKey = '6dee3bff37c801915d92';
const pinataSecretApiKey = "eeaafb81db6221fda8c418e1aa3aa55481e19c99b919b485015e5ea64c746055";

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const options = {
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.post(url, jsonMetadata, options);
        return response.data.IpfsHash;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', error);
        throw error;
    }
}


