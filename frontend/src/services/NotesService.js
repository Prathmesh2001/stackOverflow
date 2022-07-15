import http from '../http-common'

class NotesService{
    getAll(){
        return http.get('/quest/');
    }

    add(data){
        return http.post('/quest/', data);
    }

    // delete(id){
    //     return http.delete(`/note/getNote/${id}`)
    // }

    // update(id, data){
    //     return http.put(`/note/getNote/${id}`, data)
    // }
}

export default new NotesService();