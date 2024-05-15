import { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

const FormToUploadToDrive = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    file: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload file to Google Drive
      const accessToken = 'YOUR_SERVICE_ACCOUNT_ACCESS_TOKEN'; // Replace with your service account access token
      const fileData = new FormData();
      fileData.append('file', formData.file);
      const driveResponse = await axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', fileData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Store form data in Google Drive
      const formDataToStore = {
        name: formData.name,
        email: formData.email,
        fileId: driveResponse.data.id, // File ID from Google Drive
      };
    //   const databaseResponse = await axios.post('YOUR_DATABASE_ENDPOINT', formDataToStore);

      // Clear form after submission
      setFormData({
        name: '',
        email: '',
        file: null
      });

      // Handle success or show a success message
    //   console.log('Form submitted successfully', databaseResponse);
    } catch (error) {
      // Handle error
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormToUploadToDrive;
