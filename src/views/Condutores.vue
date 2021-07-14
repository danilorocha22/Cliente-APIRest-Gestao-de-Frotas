<template>
  <div id="app" class="condutores">
    
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
      <DataTable style="border: 1px solid #05a85f" ref="dt" :value="condutores" v-model:selection="selectedProducts" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="De {first} a {last} do total de {totalRecords} condutores" responsiveLayout="scroll" >
        <!--Topo da Tabela-->
        <template #header>
          <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Gerenciamento de Condutores</h5>
						<span class="p-input-icon-left">
              <i class="pi pi-filter" />
              <InputText v-model="filters['global'].value" placeholder="Filtrar dados..." />
            </span>
					</div>
        </template>
        <!--Colunas da Tabela-->
        <Column selectionMode="multiple" style="width: 0.5rem" :exportable="false"></Column>

        <Column field="id" header="Id" :sortable="true" style="min-width:0.5rem"></Column>

        <Column field="nome" header="Nome" :sortable="true" style="min-width:6rem"></Column>

        <Column field="sobrenome" header="Sobrenome" :sortable="true" style="min-width:8rem"></Column>

        <Column field="cpf" header="CPF" :sortable="true" style="min-width:8rem">></Column>

        <Column field="rg" header="RG" :sortable="true" style="min-width:6rem">></Column>

        <Column field="data_nasc" header="Data Nasc." :sortable="true" style="min-width:8rem">></Column>

        <Column field="genero" header="Sexo" :sortable="true" style="min-width:6rem">></Column>

        <!--Coluna dos botões da Cnh e Endereço-->
        <Column header="Opções" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button style="padding: 4px" icon="pi pi-id-card" label="Cnh" class="p-button p-button-info p-mr-2 p-button-sm" @click="openCNH(slotProps.data)" />
            <Button style="padding: 4px" icon="pi pi-home" label="Endereço" class="p-button p-button-info p-button-sm" @click="openEndereco(slotProps.data)" />
          </template>
        </Column>

        <!--Coluna do botão Ordem de Tráfego-->
        <Column header="Ordem de Tráfego" :exportable="false" style="width:7rem">
          <template #body="slotProps" >
            <Button style="padding: 4px" icon="pi pi-external-link" label="Abrir" class="p-button p-button-success p-button-sm" @click.prevent="openOrdemTrafego(slotProps.data.id)" />
          </template>
        </Column>
        
        <!--Coluna dos Botões Editar e Deletar-->
        <Column header="Ações" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button style="padding: 4px" title="Editar" icon="pi pi-pencil" class="p-button-rounded p-button-secundary p-mr-2 p-button-sm" @click="editProduct(slotProps.data)" />
            <Button style="padding: 4px" title="Excluir" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
    <!--Fim da Tabela-->
    
    <!--Tabela da CNH-->
    <Dialog v-model:visible="cnhDialog" :style="{width: '550px'}" header="Dados da CNH" :modal="true" class="p-fluid">

      <table style="border: 1px solid #05a85f" >
        <thead>
          <tr>
            <th>Condutor</th>
            <th>CNH</th>
            <th>Categoria</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>{{cnh[0]}} {{cnh[1]}}</td>
            <td>{{cnh[2]}}</td>
            <td>{{cnh[3]}}</td>
            <td>{{cnh[4]}}</td>
          </tr>
        </tbody>
      </table>

      <!--Botão sair-->
      <template #footer>
        <Button label="Sair" icon="pi pi-times" type="reset" class="p-button-text" @click="hidePesquisa"/>
      </template>
    </Dialog>
    <!--Fim da Tabela CNH-->

    <!--Tabela de Endereços-->
    <Dialog v-model:visible="enderecoDialog" :style="{width: '700px'}" header="Endereço" :modal="true" class="p-fluid">

      <table style="border: 1px solid #05a85f" >
        <thead>
          <tr>
            <th>Condutor</th>
            <th>Logadouro</th>
            <th>Bairro</th>
            <th>CEP</th>
            <th>Cidade</th>
            <th>UF</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>{{endereco[0]}} {{endereco[1]}}</td>
            <td>{{endereco[2]}}</td>
            <td>{{endereco[3]}}</td>
            <td>{{endereco[4]}}</td>
            <td>{{endereco[5]}}</td>
            <td>{{endereco[6]}}</td>
          </tr>
        </tbody>
      </table>

      <!--Botão sair-->
      <template #footer>
        <Button label="Sair" icon="pi pi-times" type="reset" class="p-button-text" @click="hidePesquisa"/>
      </template>
    </Dialog>
    <!--Fim da Tabela Endereços-->

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
        <Column field="condutor.nome" header="Condutor" style="min-width:5rem"></Column>
        <Column field="condutor.cnh.cnhNumero" header="CNH" style="min-width:5rem"></Column>
        <Column field="veiculo.modelo.nomeModelo" header="Veículo" style="min-width:5rem"></Column>
        <Column field="veiculo.num_placa" header="Placa" style="min-width:5rem"></Column>
      </DataTable>

      <!--Botão sair-->
      <template #footer>
        <Button label="Sair" icon="pi pi-times" type="reset" class="p-button-text" @click="hidePesquisa"/>
      </template>

    </Dialog>
    <!--Fim da Tabela Ordem de Trafego-->

    <!--Formulário de Cadastro-->
    <Dialog v-model:visible="productDialog" :style="{width: '600px'}" header="Cadastrar Condutor" :modal="true" class="p-fluid">

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="nome">Nome</label>
            <InputText id="nome" v-model="condutor.nome" required="true" autofocus :class="{'p-invalid': submitted && !condutor.nome}" />
            <small class="p-error" v-if="submitted && !condutor.nome">Nome obrigatório!</small>
        </div>

        <div class="p-field p-col-7 ">
          <label for="sobrenome">Sobrenome</label>
            <InputText id="sobrenome" v-model.trim="condutor.sobrenome" required="true" :class="{'p-invalid': submitted && !condutor.sobrenome}" />
            <small class="p-error" v-if="submitted && !condutor.sobrenome">Sobrenome obrigatório!</small>
        </div>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label for="rg">RG</label>
          <InputMask id="rg" mask="999.999"  placeholder="999.999" v-model="condutor.rg" required="true" :class="{'p-invalid': submitted && !condutor.rg}"  />
          <small class="p-error" v-if="submitted && !condutor.rg">RG obrigatório!</small>
        </div>

        <div class="p-field p-col-7">
          <label for="cpf">CPF</label>
          <InputMask id="cpf" mask="999.999.999-99"  placeholder="999.999.999-99" v-model.trim="condutor.cpf" required="true" :class="{'p-invalid': submitted && !condutor.cpf}" />
          <small class="p-error" v-if="submitted && !condutor.cpf">CPF obrigatório!</small>
        </div>
      </div>

      <div class="p-formgrid p-grid p-mt-3">
        <div class="p-field p-col">
          <div class="p-float-label">
            <InputMask id="data_nasc" mask="99/99/9999" slotChar="dd/mm/aaaa" v-model="condutor.data_nasc" required="true" :class="{'p-invalid': submitted && !condutor.data_nasc}"  />
            <label for="data_nasc">Data Nascimento</label>
            <small class="p-error" v-if="submitted && !condutor.data_nasc">Data nascimento obrigatório!</small>
          </div>
        </div>

        <div class="p-field p-col">
          <Dropdown id="genero" v-model="condutor.genero " :options="generos" optionLabel="label" placeholder="Selecione o sexo">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span>{{slotProps.value.label}}</span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span>{{slotProps.value}}</span>
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
          <label for="cnhNum">CNH nº</label>
          <InputMask id="cnhNum" mask="999.999"  placeholder="999.999" v-model="condutor.cnh.cnhNumero" required="true" :class="{'p-invalid': submitted && !condutor.cnh.cnhNumero}" />
          <small class="p-error" v-if="submitted && !condutor.cnh.cnhNumero">Número CNH obrigatório!</small>
        </div>

        <div class="p-field p-col">
          <label for="cnhCat" class="p-mb-2">CNH Categoria</label>
          <Dropdown id="cnhCat" v-model="condutor.cnh.cnhCategoria" :options="categorias" optionLabel="value" placeholder="Selecione">
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
          <label for="cnhVal">CNH Vencimento</label>
          <InputMask id="cnhVal"  mask="99/99/9999" placeholder="99/99/9999" slotChar="dd/mm/aaaa" v-model="condutor.cnh.cnhVencimento" required="true" :class="{'p-invalid': submitted && !condutor.cnh.cnhVencimento}"  />
          <small class="p-error" v-if="submitted && !condutor.cnh.cnhVencimento">Vencimento CNH obrigatório!</small>
        </div>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field p-col-7">
          <label for="logadouro">Logadouro</label>
          <InputText id="logadouro" v-model.trim="condutor.endereco.logadouro" placeholder="Rua, qd, nº..." required="true" :class="{'p-invalid': submitted && !condutor.endereco.logadouro}" />
          <small class="p-error" v-if="submitted && !condutor.endereco.logadouro">Logadouro obrigatório!</small>
        </div>

        <div class="p-field p-col-5">
          <label for="bairro">Bairro</label>
          <InputText id="bairro" v-model="condutor.endereco.bairro" required="true" :class="{'p-invalid': submitted && !condutor.endereco.bairro}"  />
          <small class="p-error" v-if="submitted && !condutor.endereco.bairro">Bairro obrigatório!</small>
        </div>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field p-col-3">
          <label for="cep">CEP</label>
          <InputMask id="cep" mask="99.999-999" placeholder="99.999-999" v-model.trim="condutor.endereco.cep" required="true" :class="{'p-invalid': submitted && !condutor.endereco.cep}" />
          <small class="p-error" v-if="submitted && !condutor.endereco.cep">CEP obrigatório!</small>
        </div>

        <div class="p-field p-col-7">
          <label for="cidade">Cidade</label>
          <InputText id="cidade" v-model="condutor.endereco.cidade" required="true" :class="{'p-invalid': submitted && !condutor.endereco.cidade}"  />
          <small class="p-error" v-if="submitted && !condutor.endereco.cidade">Cidade obrigatório!</small>
        </div>

        <div class="p-field p-col-2">
          <label for="uf" class="p-mb-2">UF</label>
          <Dropdown id="uf" v-model="condutor.endereco.uf" :options="estados" optionLabel="label" placeholder="--">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span >{{slotProps.value.label}}</span>
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

      <div class="p-field p-col">
        <label for="genero" class="p-mb-2">Pelo gênero dos Condutores</label>
        <Dropdown id="genero" v-model="pesquisa.genero " :options="generos" optionLabel="label" placeholder="Selecione o sexo">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span >{{slotProps.value.label}}</span>
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
        <label for="cat" class="p-mb-2">Pela categoria da CNH</label>
        <Dropdown id="cat" v-model="pesquisa.cnhCat " :options="categorias" optionLabel="label" placeholder="Selecione a categoria">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span>{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span>{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
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
        <span v-if="condutor">Deseja excluir condutor <b>{{condutor.nome}}</b>, <b>CPF {{condutor.cpf}}</b>?</span>
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
        <span v-if="condutor">Tem certeza que deseja excluir os condutores selecionados?</span>
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
import Condutor from "@/services/CondutorService";
import OrdemTrafego from "@/services/OrdemTrafegoService";

export default {
  data() {
    return {
      condutor: {
        id: "",
        nome: "",
        sobrenome: "",
        cpf: "",
        rg: "",
        data_nasc: "",
        genero: "",
        cnh: {
          cnhNumero: "",
          cnhCategoria: "",
          cnhVencimento: ""
        },
        endereco: {
          logadouro: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: ""
        },
      },
      pesquisa: {
        genero: "",
        cnhCat: ""
      },
      idCondutor: "",
      ordemTrafegoDialog: false,
      cnh: [],
      endereco: [],
      pesquisaDialog: false,
      cnhDialog: false,
      enderecoDialog: false,
      condutores: [],
      ordensTrafego: [],
      colunas: null,
      condutoresExcluidos: [],
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      selectedProducts: null,
      submitted: false,
      filters: {},
      generos: [
        {label: 'Masculino', value: 'M'},
        {label: 'Feminino',  value: 'F'},
      ],
      categorias: [
        {label: 'A',  value: 'A'},
        {label: 'AB', value: 'AB'},
        {label: 'B',  value: 'B'},
        {label: 'C',  value: 'C'},
        {label: 'D',  value: 'D'}
      ],
      estados: [
        {label: 'AC', value: 'AC'},
        {label: 'AL', Value: 'AL'},
        {label: 'AM', value: 'AM'},
        {label: 'AP', value: 'AP'},
        {label: 'BA', value: 'BA'},
        {label: 'CE', value: 'CE'},
        {label: 'DF', value: 'DF'},
        {label: 'ES', value: 'ES'},
        {label: 'GO', value: 'GO'},
        {label: 'MA', value: 'MA'},
        {label: 'MG', value: 'MG'},
        {label: 'MS', value: 'MS'},
        {label: 'MT', value: 'MT'},
        {label: 'PA', value: 'PA'},
        {label: 'PB', value: 'PB'},
        {label: 'PE', value: 'PE'},
        {label: 'PI', value: 'PI'},
        {label: 'PR', value: 'PR'},
        {label: 'RJ', value: 'RJ'},
        {label: 'RN', value: 'RN'},
        {label: 'RO', value: 'RO'},
        {label: 'RR', value: 'RR'},
        {label: 'RS', value: 'RS'},
        {label: 'SC', value: 'SC'},
        {label: 'SE', value: 'SE'},
        {label: 'SP', value: 'SP'},
        {label: 'TO', value: 'TO'}
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
      Condutor.listar().then(response => {
        this.condutores = response.data;
      })
    },

    limpar() {
      for(let value in this.condutor) {
        switch (typeof this.condutor[value]) {
          case 'string':
              this.condutor[value] = '';
              break;
          case 'number':
              this.condutor[value] = 0
              break;
          case 'object':
                Array.isArray(this.condutor[value]) ? this.condutor[value] = [] : this.condutor[value] = {}
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

    openCNH(data) {
      this.cnh[0] = data.nome
      this.cnh[1] = data.sobrenome
      this.cnh[2] = data.cnh.cnhNumero
      this.cnh[3] = data.cnh.cnhCategoria
      this.cnh[4] = data.cnh.cnhVencimento
      this.cnhDialog = true;
    },

    openEndereco(data) {
      this.endereco[0] = data.nome
      this.endereco[1] = data.sobrenome
      this.endereco[2] = data.endereco.logadouro
      this.endereco[3] = data.endereco.bairro
      this.endereco[4] = data.endereco.cep
      this.endereco[5] = data.endereco.cidade
      this.endereco[6] = data.endereco.uf
      this.enderecoDialog = true;
    },

    openOrdemTrafego(data) {
      this.idCondutor = data;
      this.pesquisar()
    },

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
      this.limpar()
      this.listar()
    },

    hidePesquisa() {
      //this.limparPesquisa()
      this.pesquisaDialog = false;
      this.cnhDialog = false;
      this.enderecoDialog = false;
      this.ordemTrafegoDialog = false;
    },

    editProduct(condutor) {
      this.condutor = condutor;
      this.productDialog = true;
    },

    confirmDeleteProduct(condutor) {
      this.condutor = condutor;
      this.deleteProductDialog = true;
    },

    deleteProduct() {
      Condutor.deletarCondutor(this.condutor).then(() => {
        this.listar();
        this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Condutor excluído!', life: 3000});
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
        this.condutoresExcluidos = this.condutores.filter(val => this.selectedProducts.includes(val));
        this.condutores = this.condutores.filter(val => !this.selectedProducts.includes(val));
        
        Condutor.deletar(this.condutoresExcluidos).then(() => {
          this.listar();
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Condutores excluídos!', life: 3000});
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

			if (this.condutor.nome.trim()) {
        
        //Atualizar Condutor
        if (this.condutor.id) {

          //genero
          this.condutor.genero = this.condutor.genero.value ? this.condutor.genero.value: this.condutor.genero;

          //cnh categoria
          this.condutor.cnh.cnhCategoria = this.condutor.cnh.cnhCategoria.value ? this.condutor.cnh.cnhCategoria.value: this.condutor.cnh.cnhCategoria;

          //uf
          this.condutor.endereco.uf = this.condutor.endereco.uf.value ? this.condutor.endereco.uf.value: this.condutor.endereco.uf;
          
          Condutor.atualizar(this.condutor).then(() => {
            this.listar();
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Condutor atualizado!', life: 3000});
          })
          this.productDialog = false;
          this.limpar()

        } else {
          //Criar Condutor

          //gênero
          this.condutor.genero = this.condutor.genero.value ? this.condutor.genero.value: this.condutor.genero;

          //cnh categoria
          this.condutor.cnh.cnhCategoria = this.condutor.cnh.cnhCategoria.value ? this.condutor.cnh.cnhCategoria.value: this.condutor.cnh.cnhCategoria;

          //uf
          this.condutor.endereco.uf = this.condutor.endereco.uf.value ? this.condutor.endereco.uf.value: this.condutor.endereco.uf;

          Condutor.salvar(this.condutor).then(() => {
            this.listar();
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Condutor cadastrado!', life: 3000});
          })
        }
        this.productDialog = false;
        this.limpar()
      }
    },

    //Pesquisas customizadas
    pesquisar() {
      if(this.pesquisa.genero != "") {

        this.pesquisa.genero = this.pesquisa.genero.value ? this.pesquisa.genero.value: this.pesquisa.genero;

        Condutor.pesquisarGenero(this.pesquisa.genero).then(response => {
        if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Condutor não localizado!', life: 3000});
          } else {
            this.condutores = response.data;
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
          }
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'A consulta falhou!', life: 3000});
        });
      }

      if(this.pesquisa.cnhCat != "") {

        this.pesquisa.cnhCat = this.pesquisa.cnhCat.value ? this.pesquisa.cnhCat.value: this.pesquisa.cnhCat;

        Condutor.pesquisarCnhCat(this.pesquisa.cnhCat).then(response => {
          if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Categoria não localizada!', life: 3000});
          } else {
            this.condutores = response.data;
            this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Consulta realizada!', life: 3000});
          }
        }).catch(() => {
          this.$toast.add({severity:'error', summary: 'Erro', detail: 'A consulta falhou!', life: 3000});
        });
      }

      if(this.idCondutor != "") {
        OrdemTrafego.pesquisarOrdemTrafegoPeloIdCondutor(this.idCondutor).then(response => {
        if(response.data.length == 0) {
            this.$toast.add({severity:'warn', summary: 'Aviso', detail: 'Condutor não possui ordens de tráfego!', life: 3000});
          } else {
            this.ordensTrafego = response.data;
            this.ordemTrafegoDialog = true;
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

table {
  width: 100%;
  padding: 1rem 0 1rem 1rem;
}

tr {
  text-align: justify;
}

</style>