const common = {
    namespaced: true,//开启命名空间
    state: {
        categories:'',
        organizations:'',
        teachers:''
    },
    getters: {
        categories: state => state.categories,
        organizations: state => state.organiztions,
        teachers: state => state.teachers,
        getCategoryId: state => (category_name) => {
            let categories = state.categories
            let id = ''
            categories.forEach(category=>{
                if(category.category_name==category_name){
                    id = category.category_id
                }
            })
            return id
        },
        getTeacherId: state => (teacher_name) => {
            let teachers = state.teachers
            let id = '';
            teachers.forEach(teacher => {
                if(teacher.user_name==teacher_name){
                    id = teacher.user_id
                }
            });
            return id
        },
        getCategoryName: state => (category_id) => {
            let categories = state.categories
            let name = ''
            categories.forEach(category=>{
                if(category.category_id==category_id){
                    name = category.category_name
                }
            })
            return name
        } 
        
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => {
            state.categories = categories
        },
        SET_ORGANIZATIONS: (state, organizations) => {
            state.organizations = organizations
        },
        SET_TEACHERS: (state, teachers) => {
            state.teachers = teachers
        }
    },
}

export default common