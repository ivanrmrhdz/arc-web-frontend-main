export default class Api {

    constructor(axios, url) {
        this.axios = axios; 
        this.url = url;
    }

/*    async login(params) {
        return await this.axios.post(`${this.url}/auth/login`, params);
    }

    async verify() {
        return await this.axios.post(`${this.url}/auth/verify`);
    }
*/
    async getRecords(date = null) {
        
        return await this.axios.get(`${this.url}/records/`, {
            headers: {
                'date-request': date,
            }
        });
    }
    
    async getRecordsData(year) {
        return await this.axios.get(`${this.url}/records/data-by-year`, {
            headers: {
                'year': year,
            }
        });
    }
/*
    async getUsers() {
        return await this.axios.get(`${this.url}/users`);
    }

    async getUser(id) {
        return await this.axios.get(`${this.url}/users/${id}`);
    }
    
    async createUser(params) {
        return await this.axios.post(`${this.url}/users/`, params);
    }
    
    async updateUser(id, params) {
        return await this.axios.put(`${this.url}/users/${id}`, params);
    }
    
    async deleteUser(id) {
        return await this.axios.delete(`${this.url}/users/${id}`);
    }
    
    async getRoles() {
        return await this.axios.get(`${this.url}/roles/`);
    }*/
}