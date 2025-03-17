import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role) {
            config.headers['UserRole'] = user.role;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const API_URL = 'http://localhost:5000/api';  // Make sure this matches your backend URL

export const getProducts = async (category) => {
    const response = await axios.get(`${API_URL}/products${category ? `?category=${category}` : ''}`);
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const testConnection = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/test-connection`);
        console.log('Database connection test:', response.data);
        return response.data;
    } catch (error) {
        console.error('Connection test failed:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username: userData.username,
            email: userData.email,
            password: userData.password
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

export const getCategoryProducts = async (categoryId) => {
    const response = await axios.get(`${API_URL}/categories/${categoryId}/products`);
    return response.data;
};

export const getSales = async () => {
    const response = await axios.get(`${API_URL}/sales`);
    return response.data;
};

export const getSale = async (id) => {
    const response = await axios.get(`${API_URL}/sales/${id}`);
    return response.data;
};

export const createSale = async (saleData) => {
    const response = await axios.post(`${API_URL}/sales`, saleData);
    return response.data;
};

export const updateSaleProducts = async (saleId, productIds) => {
    const response = await axios.put(`${API_URL}/sales/${saleId}/products`, productIds);
    return response.data;
};

export const getEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
};

export const getEmployee = async (id) => {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employeeData);
        return response.data;
    } catch (error) {
        console.error('CreateEmployee API error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
};

export const getRoles = async () => {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
};

export const getRole = async (id) => {
    const response = await axios.get(`${API_URL}/roles/${id}`);
    return response.data;
};
