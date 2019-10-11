import { combineReducers } from "redux";

const INITIAL_STATE_BEM = {
  selecionado: false,
  dados: {
    id: null,
    codigo: null,
    descricao: null,
    produto_descricao: null,
    sigla: null,
    encontrado: null,
    ccusto: null
  }
};

const selecionaBem = payload => {
  return { type: "FILTRAR", payload };
};

const getBem = payload => {
  return { type: "GET", payload };
};

window.getBem = getBem;
window.selecionaBem = selecionaBem;

const bensReducer = (state = INITIAL_STATE_BEM, action) => {
  if (action.type == "FILTRAR") {
    state.dados.codigo = action.payload;
    state.selecionado = true;
    return { ...state };
  } else {
    return { ...state };
  }
};

export default bensReducer;
