<template>
  <div id="app" class="ordemTrafego">
    
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
      <DataTable style="border: 1px solid #05a85f" ref="dt" :value="ordensTrafego" v-model:selection="selectedProducts" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="De {first} a {last} do total de {totalRecords} ordens de tráfego" responsiveLayout="scroll">
        <!--Topo da Tabela-->
        <template #header>
          <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Gerenciamento de Ordens de Tráfego</h5>
						<span class="p-input-icon-left">
              <i class="pi pi-filter" />
              <InputText v-model="filters['global'].value" placeholder="Filtrar dados..." />
            </span>
					</div>
        </template>
        <!--Colunas da Tabela-->
        <Column selectionMode="multiple" style="width:0.5rem" :exportable="false"></Column>
        <Column field="id" header="Id" :sortable="true" style="width:0.5rem"></Column>
        <Column field="origem" header="Origem" :sortable="true" style="min-width:4rem"></Column>
        <Column field="destino" header="Destino" :sortable="true" style="min-width:4rem"></Column>
        <Column field="dataViagem" header="Data da Viagem" :sortable="true" style="min-width:4rem">></Column>
        <Column field="dataRetorno" header="Data do Retorno" :sortable="true" style="min-width:4rem">></Column>
        <Column field="distanciaPercorrida" header="Km" :sortable="true" style="width:1rem">></Column>
        <Column field="status" header="Status" :sortable="true" style="min-width:4rem">></Column>
        <Column field="condutor.nome" header="Condutor" :sortable="true" style="width:4rem">></Column>
        <Column field="condutor.cnh.cnhNumero" header="CNH" :sortable="true" style="min-width:4rem">></Column>
        <Column field="veiculo.modelo.nomeModelo" header="Veículo" :sortable="true" style="width:4rem">></Column>
        <Column field="veiculo.num_placa" header="Placa" :sortable="true" style="min-width:7rem">></Column>

        <!--Coluna dos Botões Editar e Deletar-->
        <Column header="Opções" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-secundary p-mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" title="Excluir" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
    <!--Fim da Tabela-->

    <!--Formulário de Cadastro-->
    <Dialog v-model:visible="productDialog" :style="{width: '600px'}" header="Cadastrar Ordem de Tráfego" :modal="true" class="p-fluid">

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="origem">Origem</label>
            <InputText id="origem" v-model.trim="ordemTrafego.origem" required="true" autofocus :class="{'p-invalid': submitted && !ordemTrafego.origem}" />
            <small class="p-error" v-if="submitted && !ordemTrafego.origem">Origem obrigatória!</small>
        </div>

        <div class="p-field p-col">
          <label for="destino">Destino</label>
            <InputText id="destino" v-model.trim="ordemTrafego.destino" required="true" :class="{'p-invalid': submitted && !ordemTrafego.destino}" />
            <small class="p-error" v-if="submitted && !ordemTrafego.destino">Destino obrigatório!</small>
        </div>
      </div>

      <div class="p-formgrid p-grid p-mt-3">

        <div class="p-field p-col">
          <div class="p-float-label">
            <InputMask id="dataViagem" mask="99/99/9999" slotChar="dd/mm/aaaa" v-model="ordemTrafego.dataViagem" required="true" :class="{'p-invalid': submitted && !ordemTrafego.dataViagem}" />
            <label for="dataViagem">Data da Viagem</label>
            <small class="p-error" v-if="submitted && !ordemTrafego.dataViagem">Data da viagem obrigatório!</small>
          </div>
        </div>

        <div class="p-field p-col">  
          <div class="p-float-label">
            <InputMask id="dataRetorno" mask="99/99/9999" slotChar="dd/mm/aaaa" v-model="ordemTrafego.dataRetorno" required="true" :class="{'p-invalid': submitted && !ordemTrafego.dataRetorno}" />
            <label for="dataRetorno">Data do Retorno</label>
            <small class="p-error" v-if="submitted && !ordemTrafego.dataRetorno">Data de retorno obrigatório!</small>
          </div>
        </div>
      </div>

      <div class="p-formgrid p-grid p-mt-3">
        <div class="p-field p-col">
          <label for="distancia">Distância</label>
            <InputNumber id="distancia" suffix=" km" v-model="ordemTrafego.distanciaPercorrida" integeronly required="true" :class="{'p-invalid': submitted && !ordemTrafego.distanciaPercorrida}" />
            <small class="p-error" v-if="submitted && !ordemTrafego.distanciaPercorrida">Distância obrigatória!</small>
        </div>

        <div class="p-field p-col">
          <label for="status" class="p-mb-2">Status da Viagem</label>
          <Dropdown id="status" v-model="ordemTrafego.status" :options="statuss" optionLabel="value" placeholder="Selecione">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span>{{slotProps.value.value}}</span>
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
      
      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="condutor" >Condutor</label>
          <Dropdown id="condutor" v-model="ordemTrafego.condutor" :options="condutores" placeholder="Escolha o condutor" optionLabel="nome" >
            <template #value="condutores">
              <div v-if="condutores.value && !condutores.value">
                <span>{{condutores.value.nome}}</span>
              </div>
              <div v-else-if="condutores.value && condutores.value.nome">
                <span >{{condutores.value.nome+" "+condutores.value.sobrenome+" - CPF: "+condutores.value.cpf}}</span>
              </div>
              <span v-else>
                {{condutores.placeholder}}
              </span>
            </template>
          </Dropdown>
        </div>

        <div class="p-field p-col">
          <label for="veiculo">Veiculo</label>
          <Dropdown id="veiculo" v-model="ordemTrafego.veiculo" :options="veiculos" placeholder="Escolha o veículo" optionLabel="modelo.nomeModelo">
            <template #value="veiculos">
              <div v-if="veiculos.value && !veiculos.value">
                <span>{{veiculos.value.modelo.nomeModelo}}</span>
              </div>
              <div v-else-if="veiculos.value && veiculos.value.modelo">
                <span>{{veiculos.value.modelo.nomeModelo+" - Placa: "+veiculos.value.num_placa}}</span>
              </div>
              <span v-else>
                {{veiculos.placeholder}}
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
    <!--Fim do Formulário de Cadastro-->

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

      <span style="margin-bottom: 3px;">Pelo trajeto da viagem</span>
      <div class="p-formgrid p-grid p-mt-1">
        <div class="p-field p-col">
            <InputText v-model="pesquisa.origem" placeholder="Local de origem"/>
        </div>

        <div class="p-field p-col">
            <InputText v-model="pesquisa.destino" placeholder="Local de destino" />
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
        <span v-if="ordemTrafego">Tem certeza de que deseja excluir a <b>Ordem de Tráfego cod. {{ordemTrafego.id}}</b>?</span>
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
        <span v-if="ordemTrafego">Tem certeza que deseja excluir as ordens de tráfego selecionadas?</span>
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
import OrdemTrafego from "@/services/OrdemTrafegoService";
import Condutor from "@/services/CondutorService";
import Veiculo from "@/services/VeiculoService";

export default {
  data() {
    return {
      ordemTrafego: {
        id: "",
        origem: "",
        destino: "",
        dataViagem: "",
        dataRetorno: "",
        distanciaPercorrida: "",
        status: "",
        condutor: {},
        veiculo: {},
      },
      pesquisa: {
        kmInicial: "",
        kmFinal: "",
        origem: "",
        destino: ""
      },
      condutores: [],
      veiculos: [],
      ordensTrafego: [],
      ordensTrafegoExcluidos: [],
      productDialog: false,
      pesquisaDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      selectedProducts: null,
      submitted: false,
      filters: {},
      statuss: [
        {value: "Aguardando"},
        {value: "Iniciado"},
        {value: "Finalizado"},
        {value: "Cancelado"}
      ]
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
      OrdemTrafego.listar().then(response => {
        this.ordensTrafego = response.data;
      })

      Condutor.listar().then(response => {
        this.condutores = response.data;
      })

      Veiculo.listar().then(response => {
        this.veiculos = response.data;
      })
    },

    limpar() {
      for(let value in this.ordemTrafego) {
        switch (typeof this.ordemTrafego[value]) {
          case 'string':
              this.ordemTrafego[value] = '';
              break;
          case 'number':
              this.ordemTrafego[value] = 0
              break;
          case 'object':
                Array.isArray(this.ordemTrafego[value]) ? this.ordemTrafego[value] = [] : this.ordemTrafego[value] = {}
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

    hideDialog() {
      this.limpar()
      this.listar()
      this.productDialog = false;
      this.submitted = false;
    },

    hidePesquisa() {
      this.limparPesquisa()
      this.pesquisaDialog = false;
    },

    editProduct(ordemTrafego) {
      this.ordemTrafego = ordemTrafego;
      this.productDialog = true;
    },

    confirmDeleteProduct(ordemTrafego) {
      this.ordemTrafego = ordemTrafego;
      this.deleteProductDialog = true;
    },

    deleteProduct() {
      OrdemTrafego.deletarOrdemTrafego(this.ordemTrafego).then(() => {
        this.listar();
        this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Ordem de Tráfego excluído!', life: 3000});
      }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar execluir!', life: 3000});
        });
      this.deleteProductDialog = false;
    },
    
    confirmDeleteSelected() {
        this.deleteProductsDialog = true;
    },

    //Deletar lista de Ordens de Tráfego selecionadas
    deleteSelectedProducts() {
        this.ordensTrafegoExcluidos = this.ordensTrafego.filter(val => this.selectedProducts.includes(val));
        this.ordensTrafego = this.ordensTrafego.filter(val => !this.selectedProducts.includes(val));
        
        OrdemTrafego.deletar(this.ordensTrafegoExcluidos).then(() => {
          this.listar();
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Ordens de Tráfego excluídos!', life: 3000});
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
      
      //Atualizar Ordem de Tráfego
      if (this.ordemTrafego.id) {

        //estatus da viagem
        this.ordemTrafego.status = this.ordemTrafego.status.value ? this.ordemTrafego.status.value: this.ordemTrafego.status;
        
        OrdemTrafego.atualizar(this.ordemTrafego).then(() => {
          this.listar();
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Ordem de Tráfego atualizada!', life: 3000});
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar atualizar!', life: 3000});
        });
        this.productDialog = false;
        this.limpar()

      } else {
        //Criar Ordem de Tráfego

        //estatus da viagem
        this.ordemTrafego.status = this.ordemTrafego.status.value ? this.ordemTrafego.status.value: this.ordemTrafego.status;

        OrdemTrafego.salvar(this.ordemTrafego).then(() => {
          this.listar();
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Ordem de Tráfego cadastrada!', life: 3000});
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar salvar!', life: 3000});
        });
      }
      this.productDialog = false;
      this.limpar()
    },

    //Pesquisas customizadas
    pesquisar() {
      if(this.pesquisa.kmFinal != "") {
        OrdemTrafego.pesquisarKm(this.pesquisa.kmInicial, this.pesquisa.kmFinal).then(response => {
        if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Quilometragem não localizada!', life: 3000});
          } else {
            this.ordensTrafego = response.data;
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
          }
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'A consulta falhou!', life: 3000});
        });
      }

      if(this.pesquisa.origem != "" && this.pesquisa.destino != "") {
        OrdemTrafego.pesquisarTrajeto(this.pesquisa.origem, this.pesquisa.destino).then(response => {
          if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Trajeto não localizado!', life: 3000});
          } else {
            this.ordensTrafego = response.data;
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
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