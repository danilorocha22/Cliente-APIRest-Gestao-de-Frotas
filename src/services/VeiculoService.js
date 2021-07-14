import {http} from './Config'

export default {

    /***************************************
    * CRUD
    **************************************/
    listar:() => {
        return http.get('veiculos')
    },

    salvar:(veiculo) => {
        return http.post('veiculos', veiculo)
    },

    atualizar:(veiculo) => {
        return http.put('veiculos', veiculo)
    },

    deletar:(veiculo) => {
        return http.delete('veiculos', {data: veiculo})
    },

    deletarVeiculo:(veiculo) => {
        return http.delete('veiculos/unico', {data: veiculo})
    },

    /***************************************
    * Pesquisas customizadas
    **************************************/
    pesquisarKm:(kmInicial, kmFinal) => {
        return http.get('veiculos/km/'+kmInicial+"/"+kmFinal)
    }
}