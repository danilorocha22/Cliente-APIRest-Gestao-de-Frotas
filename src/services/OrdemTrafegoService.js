import {http} from './Config'

export default {

    /***************************************
     * CRUD
     **************************************/
    listar:() => {
        return http.get('ordenstrafego')
    },

    salvar:(ordemTrafego) => {
        return http.post('ordenstrafego', ordemTrafego)
    },

    atualizar:(ordemTrafego) => {
        return http.put('ordenstrafego', ordemTrafego)
    },

    deletar:(ordemTrafego) => {
        return http.delete('ordenstrafego', {data: ordemTrafego})
    },

    deletarOrdemTrafego:(ordemTrafego) => {
        return http.delete('ordenstrafego/unico', {data: ordemTrafego})
    },

    /***************************************
     * Pesquisas customizadas
     **************************************/
    pesquisarKm:(kmInicial, kmFinal) => {
        return http.get('ordenstrafego/km/'+kmInicial+"/"+kmFinal)
    },

    pesquisarTrajeto:(origem, destino) => {
        return http.get('ordenstrafego/trajeto/'+origem+"/"+destino)
    },

    pesquisarOrdemTrafegoPeloIdVeiculo:(idVeiculo) => {
        return http.get('ordenstrafego/veiduloid/'+idVeiculo)
    },

    pesquisarOrdemTrafegoPeloIdCondutor:(idCondutor) => {
        return http.get('ordenstrafego/condutorid/'+idCondutor)
    },

}