import api from '../index'
import urls from './urls'
export default {
    getCategories() {
        return api.get(urls.categories)
    },
    getOrganizations() {
        return api.get(urls.organizations)
    },
    getTeachers() {
        return api.get(urls.teachers)
    }
}