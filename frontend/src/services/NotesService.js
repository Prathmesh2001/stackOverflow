import http from '../http-common'

class NotesService{
    getAll(){
        return http.get('/note/');
    }

    add(data){
        return http.post('/note/', data);
    }

    delete(id){
        return http.delete(`/note/getNote/${id}`)
    }

    update(id, data){
        return http.put(`/note/getNote/${id}`, data)
    }
}

export default new NotesService();