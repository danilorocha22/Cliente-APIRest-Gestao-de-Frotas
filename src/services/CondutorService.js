import {http} from './Config'

export default {

    /***************************************
    * CRUD
    **************************************/
    listar:() => {
        return http.get('condutores')
    },

    salvar:(condutor) => {
        return http.post('condutores', condutor)
    },

    atualizar:(condutor) => {
        return http.put('condutores', condutor)
    },

    deletar:(condutor) => {
        return http.delete('condutores', {data: condutor})
    },

    deletarCondutor:(condutor) => {
        return http.delete('condutores/unico', {data: condutor})
    },

    /***************************************
    * Pesquisas customizadas
    **************************************/
    pesquisarGenero:(genero) => {
        return http.get('condutores/genero/'+genero)
    },

    pesquisarCnhCat:(cat) => {
        return http.get('condutores/cnhcat/'+cat)
    },

}