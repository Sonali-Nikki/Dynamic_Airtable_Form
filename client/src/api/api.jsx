// src/api/api.jsx
import axios from "axios";

// ✅ Use Vite environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with credentials enabled (for cookies/sessions)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies with each request
});

// =================== AUTH ===================

// Redirect to Airtable OAuth login (backend route)
export const loginWithAirtable = () => {
  // Redirect user to backend OAuth login route
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
};

// Handle OAuth callback from Airtable
export const completeAirtableLogin = async (code) => {
  // Hit backend callback route (optional if backend just redirects)
  const tokenFromHash = window.location.hash.split("token=")[1];
  if (!tokenFromHash) throw new Error("No token found");

  localStorage.setItem("token", tokenFromHash); // Save token for future requests

  // Fetch profile using token
  const res = await API.get("/auth/me");
  return { user: res.data.user, token: tokenFromHash };
};

// Get current authenticated user
export const getUserProfile = async () => {
  const res = await api.get(`/auth/me`);
  return res.data; // { id, name, email, ... }
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
