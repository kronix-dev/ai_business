import axios from 'axios';
import { message, notification } from 'antd'; // Import the notification module from Ant Design

export default class API {

    static API_URL = 'http://localhost:8000/api/';
    static ax = axios;
    static geo_link = 'http://208.73.203.91:8081/geoserver/mkurabita';

    static login(usn, psw) {
        return this.post(`auth/token`, {
            'username': usn,
            'email': usn,
            'password': psw,
        })
        .then((r) => {
            console.log(r);
            if (r.access !== undefined) {
                sessionStorage.setItem("token", r.access);
                return true;
            } else {
                return false;
            }
        })
        .catch((e) => {
            this.showErrorNotification("Login failed: " + e.message);
            return false;
        });
    }

    static post(url, data) {
        return this.ax.post(this.API_URL + url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Accept': '*/*',
            }
        })
        .then((r) => {
            return r.data;
        })
        .catch((e) => {
            this.showErrorNotification("Error during POST request: " + e.message);
        });
    }

    static get(url) {
        return this.ax.get(this.API_URL + url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Accept': '*/*',
            }
        })
        .then((r) => {
            return r.data;
        })
        .catch((e) => {
            this.showErrorNotification("Error during GET request: " + e.message);
            return this.error
        });
    }
    static error = {
        data:[],
        message: '',
        status: '0'
    }
    static uploadFile(url, formData) {
        return this.ax.post(this.API_URL + url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .catch((e) => {
            this.showErrorNotification("Error during file upload: " + e.message);
            
        });
    }

    // Static method to show error notifications
    static showErrorNotification(message) {
        notification.error({
            message: 'API Error',
            description: message,
            duration: 3, // Auto close after 3 seconds
        });
    }

    static cancel() {
        const cancelTokenSource = axios.CancelToken.source();
        cancelTokenSource.cancel();
    }
}
