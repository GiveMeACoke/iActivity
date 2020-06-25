import axios from './axios'
let instance = axios()

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    post(url, body) {
        return new Promise((resolve, reject) => {
            instance.post(url, body)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err.data)
                    })
        });
    },
    put(url, body) {
        return new Promise((resolve, reject) => {
            instance.put(url, body)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err.data)
                    })
        })
    },
    delete(url) {
        return new Promise((resolve, reject) => {
            instance.delete(url)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err.data)
                    })
        })
    }
}