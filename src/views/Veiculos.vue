<template>
  <div id="app" class="veiculo">
    
    <!--Card da Tabela-->
    <div class="card">
      <Toast />
      <!--Menu do Topo da Tabela-->
      <Toolbar class="p-mb-4" style="border: 1px solid #05a85f">
        <!--Botões Novo e Deletar Todos-->
        <template #left>
          <Button label="Novo" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
          <Button label="Excluir" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
        </template>
        
        <template #right>
          <Button label="Consultas" icon="pi pi-search" class="p-button-info p-mr-2" @click="openConsultas" />
          <Button title="Limpar consulta" icon="pi pi-refresh" class="p-button-warning p-mr-2" @click.prevent="listar" />
        </template>
      </Toolbar>

      <!--Tabela-->
      <DataTable style="border: 1px solid #05a85f" ref="dt" :value="veiculos" v-model:selection="selectedProducts" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="De {first} a {last} do total de {totalRecords} veículos" responsiveLayout="scroll">
        <!--Topo da Tabela-->
        <template #header>
          <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Gerenciamento de Veículos</h5>
						<span class="p-input-icon-left">
              <i class="pi pi-filter" />
              <InputText v-model="filters['global'].value" placeholder="Filtrar dados..." />
            </span>
					</div>
        </template>
        
        <!--Colunas da Tabela-->
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

        <Column field="id" header="Id" :sortable="true" style="min-width:3rem"></Column>

        <Column field="modelo.nomeModelo" header="Modelo" :sortable="true" style="min-width:6rem"></Column>

        <Column field="marca.nomeMarca" header="Marca" :sortable="true" style="min-width:6rem"></Column>

        <Column field="modelo.descricao" header="Descrição" :sortable="true" style="width:10rem">></Column>

        <Column field="ano_fab" header="Ano Fab" :sortable="true" style="min-width:4rem">></Column>

        <Column field="categoria" header="Categoria" :sortable="true" style="min-width:6rem">>
          <template #body="slotProps">
            <span >{{slotProps.data.categoria}}</span>
          </template>
        </Column>

        <Column field="num_placa" header="Placa" :sortable="true" style="min-width:7rem">></Column>

        <Column field="estadoConservacao" header="Estado" :sortable="true" style="min-width:6rem">>
          <template #body="slotProps">
            <span >{{slotProps.data.estadoConservacao}}</span>
          </template>
        </Column>

        <Column field="quilometragem" header="Km" :sortable="true" style="min-width:6rem">></Column>
        
        <!--Coluna do botão Ordem de Tráfego-->
        <Column header="Ordem de Tráfego" :exportable="false" style="width:7rem">
          <template #body="slotProps" >
            <Button style="padding: 4px" icon="pi pi-external-link" label="Abrir" class="p-button p-button-success p-button-sm" @click.prevent="openOrdemTrafego(slotProps.data.id)" />
          </template>
        </Column>

        <!--Coluna dos Botões Editar e Deletar-->
        <Column header="Opções" :exportable="false" style="min-width:5rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-secundary p-mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" title="Excluir" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
    <!--Fim da Tabela-->

    <!--Tabela de Ordem de Tráfego-->
    <Dialog v-model:visible="ordemTrafegoDialog" :style="{width: '1080px'}" header="Ordens de Trafego" :modal="true" class="p-fluid" >

      <DataTable style="border: 1px solid #05a85f" ref="dt" :value="ordensTrafego" v-model:selection="selectedProducts" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="De {first} a {last} do total de {totalRecords} ordens de tráfego" responsiveLayout="scroll">

        <Column field="id" header="Id" style="min-width:0.5rem"></Column>
        <Column field="origem" header="Origem" style="min-width:6rem">></Column>
        <Column field="destino" header="Destino" style="min-width:6rem">></Column>
        <Column field="dataViagem" header="Data Viagem" style="min-width:6rem">></Column>
        <Column field="dataRetorno" header="Data Retorno" style="min-width:4rem">></Column>
        <Column field="distanciaPercorrida" header="Km" style="min-width:3rem">> Km</Column>
        <Column field="veiculo.modelo.nomeModelo" header="Veículo" style="min-width:5rem"></Column>
        <Column field="veiculo.num_placa" header="Placa" style="min-width:5rem"></Column>
        <Column field="condutor.nome" header="Condutor" style="min-width:5rem"></Column>
        <Column field="condutor.cnh.cnhNumero" header="CNH" style="min-width:5rem"></Column>
      </DataTable>

      <!--Botão sair-->
      <template #footer>
        <Button label="Sair" icon="pi pi-times" type="reset" class="p-button-text" @click="hidePesquisa"/>
      </template>
    </Dialog>
    <!--Fim da Tabela Ordem de Trafego-->

    <!--Formulário de Cadastro-->
    <Dialog v-model:visible="productDialog" :style="{width: '600px'}" header="Cadastrar Veículo" :modal="true" class="p-fluid">

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="marca">Marca</label>
            <InputText id="marca" v-model="veiculo.marca.nomeMarca" required="true" autofocus :class="{'p-invalid': submitted && !veiculo.marca.nomeMarca}" />
            <small class="p-error" v-if="submitted && !veiculo.marca.nomeMarca">Marca obrigatória!</small>
        </div>

        <div class="p-field p-col">
          <label for="modelo">Modelo</label>
            <InputText id="modelo" v-model.trim="veiculo.modelo.nomeModelo" required="true" :class="{'p-invalid': submitted && !veiculo.modelo.nomeModelo}" />
            <small class="p-error" v-if="submitted && !veiculo.modelo.nomeModelo">Modelo obrigatório!</small>
        </div>
      </div>

      <div class="p-field">
        <label for="descricao">Descrição</label>
        <Textarea id="descricao" v-model="veiculo.modelo.descricao" required="true" rows="2" cols="20" :class="{'p-invalid': submitted && !veiculo.modelo.descricao}" />
        <small class="p-error" v-if="submitted && !veiculo.modelo.descricao">Descrição obrigatória!</small>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="ano_fab">Ano Fab</label>
          <InputText id="ano_fab" v-model.trim="veiculo.ano_fab" required="true" :class="{'p-invalid': submitted && !veiculo.ano_fab}" />
          <small class="p-error" v-if="submitted && !veiculo.ano_fab">Ano fabricação obrigatório!</small>
        </div>

        <div class="p-field p-col">
          <label for="num_placa">Nº Placa</label>
          <InputMask id="num_placa" mask="999-9999" placeholder="999-9999" v-model.trim="veiculo.num_placa" required="true" :class="{'p-invalid': submitted && !veiculo.num_placa}" />
          <small class="p-error" v-if="submitted && !veiculo.num_placa">Placa obrigatória!</small>
        </div>

        <div class="p-field p-col">
          <label for="quilometragem">Quilometragem</label>
          <InputNumber id="quilometragem" suffix=" km" v-model="veiculo.quilometragem" integeronly/>
        </div>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="categoria" class="p-mb-2">Categoria</label>
          <Dropdown id="categoria" v-model="veiculo.categoria" :options="categorias" optionLabel="value" placeholder="Escolha a categoria">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span >{{slotProps.value.value}}</span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span >{{slotProps.value}}</span>
              </div>
              <span v-else>
                {{slotProps.placeholder}}
              </span>
            </template>
          </Dropdown>
        </div>

        <div class="p-field p-col">
          <label for="estado" class="p-mb-2">Est. Conservação</label>
          <Dropdown id="estado" v-model="veiculo.estadoConservacao " :options="estados" optionLabel="value" placeholder="Selecione o estado">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span >{{slotProps.value.value}}</span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span >{{slotProps.value}}</span>
              </div>
              <span v-else>
                {{slotProps.placeholder}}
              </span>
            </template>
          </Dropdown>
        </div>
      </div>
      <!--Botões Salvar e Cancelar-->
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" type="reset" class="p-button-text" @click="hideDialog"/>
        <Button label="Savar" icon="pi pi-check" class="p-button-text" @click="save" />
      </template>
    </Dialog>
    <!--Fim do Formulário-->

    <!--Formulário de Consultas Personalizadas-->
    <Dialog v-model:visible="pesquisaDialog" :style="{width: '450px'}" header="Consultas Personalizadas" :modal="true" class="p-fluid">

      <span style="margin-bottom: 3px;">Pelo intervalo da quilometragem</span>
      <div class="p-formgrid p-grid p-mt-1">
        <div class="p-field p-col">
            <InputNumber suffix=" km" value="" v-model="pesquisa.kmInicial" integeronly placeholder="Km inicial"/>
        </div>

        <div class="p-field p-col">
            <InputNumber suffix=" km" value="" v-model="pesquisa.kmFinal" integeronly placeholder="Km final" />
        </div>
      </div>

      <!--Botões Pesquisar e Cancelar-->
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" type="reset" class="p-button-text" @click="hidePesquisa"/>
        <Button label="Pesquisar" icon="pi pi-check" class="p-button-text" @click.prevent="pesquisar" />
      </template>
    </Dialog>

    <!--Caixa de Texto de Exclusão Única-->
    <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirme:" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="veiculo">Tem certeza de que deseja excluir veículo <b>{{veiculo.modelo.nomeModelo}}</b> <b>placa {{veiculo.num_placa}}</b>?</span>
      </div>
      <!--Botões Não e Sim -->
      <template #footer>
        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
        <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
      </template>
    </Dialog>
    
    <!--Caixa de Texto de Exclusão da Lista-->
    <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirme:" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="veiculo">Tem certeza que deseja excluir os veículos selecionados?</span>
      </div>
      <template #footer>
        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
        <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import Veiculo from "@/services/VeiculoService";
import OrdemTrafego from "@/services/OrdemTrafegoService";

export default {
  data() {
    return {
      veiculo: {
        id: "",
        marca: {
          nomeMarca: "",
        },
        modelo: {
          nomeModelo: "",
          descricao: "",
        },
        num_placa: "",
        ano_fab: "",
        categoria: "",
        quilometragem: "",
        estadoConservacao: ""
      },
      pesquisa: {
        kmInicial: "",
        kmFinal: "",
      },
      idVeiculo: "",
      ordemTrafegoDialog: false,
      ordensTrafego: [],
      veiculos: [],
      veiculosExcluidos: [],
      pesquisaDialog: false,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      selectedProducts: null,
      submitted: false,
      filters: {},
      categorias: [
        {value: 'Hatch'},
        {value: 'Sedan'},
        {value: 'Esportivo'},
        {value: 'Perua'},
        {value: 'Picape'},
        {value: 'Suv'},
        {value: 'Caminhonete'},
        {value: 'Van'},
        {value: 'Ônibus'},
        {value: 'Caminhão'},
        {value: 'Carreta'}
      ],
      estados: [
        {value: 'Novo'},
        {value: 'Usado'},
        {value: 'Velho'},
        {value: 'Sucata'}
      ],
    }
  },

  created() {
    this.initFilters();
  },

  mounted() {
    this.listar();
  },
  
  methods: {
    listar() {
      Veiculo.listar().then(response => {
        this.veiculos = response.data;
      })
    },

    limpar() {
      for(let value in this.veiculo) {
        switch (typeof this.veiculo[value]) {
          case 'string':
              this.veiculo[value] = '';
              break;
          case 'number':
              this.veiculo[value] = 0
              break;
          case 'object':
                Array.isArray(this.veiculo[value]) ? this.veiculo[value] = [] : this.veiculo[value] = {}
              break;
          default:
        }
      }
    },

    
    limparPesquisa() {
      for(let value in this.pesquisa) {
        switch (typeof this.pesquisa[value]) {
          case 'string':
              this.pesquisa[value] = '';
              break;
          case 'number':
              this.pesquisa[value] = 0
              break;
          case 'object':
                Array.isArray(this.pesquisa[value]) ? this.pesquisa[value] = [] : this.pesquisa[value] = {}
              break;
          default:
        }
      }
    },

    openNew() {
      this.limpar();
      this.submitted = false;
      this.productDialog = true;
    },

    openConsultas() {
      this.limparPesquisa()
      this.pesquisaDialog = true;
    },

    openOrdemTrafego(data) {
      this.idVeiculo = data;
      this.pesquisar()
    },

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
      this.limpar()
      this.listar()
    },

    hidePesquisa() {
      this.limparPesquisa()
      this.pesquisaDialog = false;
      this.ordemTrafegoDialog = false;
    },

    editProduct(veiculo) {
      this.veiculo = veiculo;
      this.productDialog = true;
    },

    confirmDeleteProduct(veiculo) {
      this.veiculo = veiculo;
      this.deleteProductDialog = true;
    },

    deleteProduct() {
      Veiculo.deletarVeiculo(this.veiculo).then(() => {
        this.listar();
        this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Veículo excluído!', life: 3000});
      }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar execluir!', life: 3000});
        });
      this.deleteProductDialog = false;
    },
    
    confirmDeleteSelected() {
        this.deleteProductsDialog = true;
    },

    //Deletar lista de Veículos selecionados
    deleteSelectedProducts() {
        this.veiculosExcluidos = this.veiculos.filter(val => this.selectedProducts.includes(val));
        this.veiculos = this.veiculos.filter(val => !this.selectedProducts.includes(val));
        
        Veiculo.deletar(this.veiculosExcluidos).then(() => {
          this.listar();
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Veículos excluídos!', life: 3000});
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar execluir!', life: 3000});
        });
        this.deleteProductsDialog = false;
        this.selectedProducts = null;
    },

    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },

    save() {
      this.submitted = true;

			if (this.veiculo.modelo.nomeModelo.trim()) {
        
        //Atualizar Veículo
        if (this.veiculo.id) {

          //estado conservação
          this.veiculo.estadoConservacao = this.veiculo.estadoConservacao.value ? this.veiculo.estadoConservacao.value: this.veiculo.estadoConservacao;
          
          //categoria
          this.veiculo.categoria = this.veiculo.categoria.value ? this.veiculo.categoria.value: this.veiculo.categoria;
          
          Veiculo.atualizar(this.veiculo).then(() => {
            this.listar();
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Veículo atualizado!', life: 3000});
          })
          this.productDialog = false;
          this.limpar()

        } else {
          //Criar Veículo

          //estado de conservação
          this.veiculo.estadoConservacao = this.veiculo.estadoConservacao.value ? this.veiculo.estadoConservacao.value: this.veiculo.estadoConservacao;

          //categoria
          this.veiculo.categoria = this.veiculo.categoria.value ? this.veiculo.categoria.value: this.veiculo.categoria;

          Veiculo.salvar(this.veiculo).then(() => {
            this.listar();
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Veículo cadastrado!', life: 3000});
          })
        }
        this.productDialog = false;
        this.limpar()
      }
    },

    //Pesquisas customizadas
    pesquisar() {
      if(this.pesquisa.kmFinal != "") {
        Veiculo.pesquisarKm(this.pesquisa.kmInicial, this.pesquisa.kmFinal).then(response => {
        if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Quilometragem não localizada!', life: 3000});
          } else {
            this.veiculos = response.data;
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
          }
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'A consulta falhou!', life: 3000});
        });
      }
      
      if(this.idVeiculo != "") {
        OrdemTrafego.pesquisarOrdemTrafegoPeloIdVeiculo(this.idVeiculo).then(response => {
        if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Veículo não possui ordens de tráfego!', life: 3000});
          } else {
            this.ordensTrafego = response.data;
            this.ordemTrafegoDialog = true;
            //this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
          }
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'A consulta falhou!', life: 3000});
        });
      }

      this.limparPesquisa()
      this.hidePesquisa()
    }
  }
};

</script>

<style lang="css" scoped>
.card {
  margin-top: 30px;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
	}
}

DataTable {
  border-color: rgb(171, 177, 177);
}

.p-dialog {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
      margin-bottom: 0.25rem;
    }
	}
}
</style>