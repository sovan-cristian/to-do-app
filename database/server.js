const BASE_URL = 'http://localhost:3000';

const server = {
    getTodos(){
        const url = `${BASE_URL}/todos`;
        return fetch(url).then((res) => res.json());
    },
    getTodo(id){
        const url = `${BASE_URL}/todos/${id}`;
        return fetch(url).then((res) => res.json());
    },
    addTodo(todo){
        const url = `${BASE_URL}/todos`;
        return fetch(url,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo),
        });
    },
    updateTodo(payload, id){
        const url = `${BASE_URL}/todos/${id}`;
        return fetch(url,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });
    },
    removeTodo(id){
        const url = `${BASE_URL}/todos/${id}`;
        return fetch(url,{
            method:'DELETE'
        });
    },



};