// src/api/api.jsx
import axios from "axios";

// ✅ Use Vite environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

// ✅ Airtable Client ID from Vite env
const AIRTABLE_CLIENT_ID = import.meta.env.VITE_AIRTABLE_CLIENT_ID;

// ✅ Redirect URI (must match your Airtable app settings)
const REDIRECT_URI = `http://localhost:5000/api/auth/airtable/callback`;

// Create axios instance with credentials enabled (for cookies/sessions)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies with each request
});

// =================== AUTH ===================

// Redirect to Airtable OAuth login (backend route)
export const loginWithAirtable = () => {
  window.location.href =
    `https://airtable.com/oauth2/v1/authorize?` +
    `client_id=${AIRTABLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code`;
};

// Handle OAuth callback from Airtable
export const completeAirtableLogin = async (code) => {
  const tokenFromHash = new URLSearchParams(window.location.hash.replace("#", "?")).get("token");

  if (!tokenFromHash) throw new Error("No token found");

  localStorage.setItem("token", tokenFromHash); // Save token for future requests

  // Fetch profile using token
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${tokenFromHash}` },
  });
  return { user: res.data.user, token: tokenFromHash };
};

// Get current authenticated user
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// =================== FORMS ===================

export const createForm = async (formData) => {
  const res = await api.post(`/forms/create`, formData);
  return res.data;
};

export const getForms = async () => {
  const res = await api.get(`/forms`);
  return res.data;
};

export const getFormById = async (formId) => {
  const res = await api.get(`/forms/${formId}`);
  return res.data;
};

export const submitFormResponse = async (formId, responseData) => {
  const res = await api.post(`/forms/${formId}/submit`, responseData);
  return res.data;
};

// =================== AIRTABLE ===================

export const getAirtableBases = async () => {
  const res = await api.get(`/airtable/bases`);
  return res.data;
};

export const getAirtableTables = async (baseId) => {
  const res = await api.get(`/airtable/${baseId}/tables`);
  return res.data;
};

export const getAirtableFields = async (baseId, tableId) => {
  const res = await api.get(`/airtable/${baseId}/${tableId}/fields`);
  return res.data;
};

export default api;
