import { SQLite } from "expo-sqlite";
import config from "./config";

export async function InitDB() {
  db = await SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  db.transaction(
    tx => {
      tx.executeSql("select 1 from configuracoes limit 1", (tx, res) => {
        console.log("Database pronta para uso");
      });
    },
    error => {
      console.log("Error: ", error);
      console.log("Database não está pronta");
      console.log("Criando tabela ptr_bem");
      db.transaction(
        tx => {
          tx.executeSql(
            "create table if not exists ptr_bem" +
              "(id integer primary key AUTOINCREMENT, codigo varchar(100), descricao text," +
              "mat_centro_custo int, grl_entidade int, produto_descricao text," +
              "data_hora text,encontrado boolean,obs text,photo text);",
            [],
            (tx, res) => {
              console.log("Tabela criada com sucesso");
            }
          );
        },
        error => {
          console.log(error);
        }
      );

      console.log("Criando tabela mat_centro_custo");
      db.transaction(
        tx => {
          tx.executeSql(
            "create table if not exists mat_centro_custo" +
              "(id integer primary key, sigla varchar(100), descricao text,unidade text);",
            [],
            (tx, res) => {
              console.log("Tabela criada com sucesso");
            }
          );
        },
        error => {
          console.log(error);
        }
      );
      console.log("Criando tabela grl_entidade");
      db.transaction(
        tx => {
          tx.executeSql(
            "create table if not exists grl_entidade" +
              "(id integer primary key, codigo varchar(100), descricao text);",
            [],
            (tx, res) => {
              console.log("Tabela criada com sucesso");
            }
          );
        },
        error => {
          console.log(error);
        }
      );
      console.log("Criando tabela configuracoes");
      db.transaction(
        tx => {
          tx.executeSql(
            "create table if not exists configuracoes" +
              "(id integer primary key, tipo text, valor text);",
            [],
            (tx, res) => {
              console.log("Tabela criada com sucesso");
            }
          );
        },
        error => {
          console.log(error);
        }
      );
      console.log("Populando configuracoes iniciais");
      db.transaction(
        tx => {
          tx.executeSql(
            "insert into configuracoes" +
              "(tipo , valor) values ('ip',null),('mat_centro_custo',null)",
            [],
            (tx, res) => {
              console.log("Tabela populada com sucesso");
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    }
  );
}

export async function GetConfigs() {
  db = SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql("select * from configuracoes", [], (txn, res) => {
          var len = res.rows.length;
          let configuracoes = [];
          let dados = {};
          for (let i = 0; i < len; i++) {
            let row = res.rows.item(i);
            tipo = row.tipo;
            valor = row.valor;
            dados[tipo] = valor;
          }
          resolve(dados);
        });
      },
      error => {
        reject(error);
        console.log(error);
      }
    );
  });
}

export async function GetCentroCusto() {
  db = SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql("select * from mat_centro_custo", [], (txn, res) => {
          var len = res.rows.length;
          let dados = [];
          for (let i = 0; i < len; i++) {
            let row = res.rows.item(i);
            dados.push({ value: row.id, label: row.sigla });
          }
          resolve(dados);
        });
      },
      error => {
        reject(error);
        console.log(error);
      }
    );
  });
}

export async function GetCentroCustoId(value) {
  db = SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "select * from mat_centro_custo where id = ? ",
          [value],
          (txn, res) => {
            var len = res.rows.length;
            let centrocusto;
            for (let i = 0; i < len; i++) {
              let row = res.rows.item(i);
              centrocusto = row;
            }
            resolve(centrocusto);
          }
        );
      },
      error => {
        reject(error);
        console.log(error);
      }
    );
  });
}

export async function SetConfigMatCentroCusto(valor) {
  db = SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "update configuracoes set valor = ? where tipo = 'mat_centro_custo'",
          [valor],
          (txn, res) => {
            resolve(true);
          }
        );
      },
      error => {
        reject(error);
        console.log(error);
      }
    );
  });
}

export async function SetConfigIp(valor) {
  db = SQLite.openDatabase(
    config.database.name,
    config.database.version,
    config.database.description,
    config.database.size
  );
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "update configuracoes set valor = ? where tipo = 'ip'",
          [valor],
          (txn, res) => {
            resolve(true);
          }
        );
      },
      error => {
        reject(error);
        console.log(error);
      }
    );
  });
}
