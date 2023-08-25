
const BASE_URL = "http://10.0.2.2:5000";
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const ApiService = {
  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch User Schedule
  async getHorarios(username) {
    try {
      const response = await fetch(`${BASE_URL}/horarios/${username}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch User Profile
  async getPerfil(username) {
    try {
      const response = await fetch(`${BASE_URL}/perfil/${username}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update User Signature
  async updateFirma(username, file) {
    try {
      const formData = new FormData();
      formData.append('firma', file);

      const response = await fetch(`${BASE_URL}/firma/${username}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};
