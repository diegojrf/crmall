using System;
using System.Collections.Generic;
using System.Data;
using crmall.Model;

namespace crmall.DAO
{
    public class ClienteDAO : Banco
    {
        public bool Grava(Cliente cliente)
        {
            if (cliente != null)
            {
                ComandoSQL.Parameters.Clear();
                ComandoSQL.Parameters.AddWithValue("@NOME", cliente.Nome);
                ComandoSQL.Parameters.AddWithValue("@DATA", cliente.DataNascimento);
                ComandoSQL.Parameters.AddWithValue("@SEXO", cliente.Sexo);
                ComandoSQL.Parameters.AddWithValue("@CEP", cliente.Cep);
                ComandoSQL.Parameters.AddWithValue("@ENDERECO", cliente.Endereco);
                ComandoSQL.Parameters.AddWithValue("@NUMERO", cliente.Numero);
                ComandoSQL.Parameters.AddWithValue("@COMPLEMENTO", cliente.Complemento);
                ComandoSQL.Parameters.AddWithValue("@BAIRRO", cliente.Bairro);
                ComandoSQL.Parameters.AddWithValue("@ESTADO", cliente.Estado);
                ComandoSQL.Parameters.AddWithValue("@CIDADE", cliente.Cidade);
                if (cliente.Id > 0)
                {
                    ComandoSQL.Parameters.AddWithValue("@ID", cliente.Id);
                    ComandoSQL.CommandText = @"UPDATE CLIENTES SET NOME = UPPER(@NOME), DATA_NASCIMENTO = @DATA, SEXO = UPPER(@SEXO), CEP = @CEP, ENDERECO = UPPER(@ENDERECO), 
                        NUMERO = UPPER(@NUMERO), COMPLEMENTO = UPPER(@COMPLEMENTO), BAIRRO = UPPER(@BAIRRO), ESTADO = UPPER(@ESTADO), CIDADE = @CIDADE  WHERE ID = @ID";
                }
                else
                {
                    ComandoSQL.CommandText = @"INSERT INTO CLIENTES (NOME, DATA_NASCIMENTO, SEXO, CEP, ENDERECO, NUMERO, COMPLEMENTO, BAIRRO, ESTADO, CIDADE)
                        VALUES(UPPER(@NOME), @DATA, UPPER(@SEXO), @CEP, UPPER(@ENDERECO), UPPER(@NUMERO), UPPER(@COMPLEMENTO), UPPER(@BAIRRO), UPPER(@ESTADO), @CIDADE)";
                }
                return ExecutaComando();
            }
            else
            {
                return false;
            }
        }

        public bool Exclui(int id)
        {
            if (id > 0)
            {
                ComandoSQL.Parameters.Clear();
                ComandoSQL.Parameters.AddWithValue("@ID", id);
                ComandoSQL.CommandText = "DELETE FROM CLIENTES WHERE ID = @ID";
                return ExecutaComando();
            }
            else
            {
                return false;
            }
        }

        public Cliente BuscaId(int id)
        {
            if (id > 0)
            {
                ComandoSQL.Parameters.Clear();
                ComandoSQL.Parameters.AddWithValue("@ID", id);
                ComandoSQL.CommandText = "SELECT * FROM CLIENTES WHERE ID = @ID";
                DataTable dt = ExecutaSelect();
                if (dt != null && dt.Rows.Count > 0)
                {
                    return CriaCliente(dt.Rows[0]);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public List<Cliente> BuscaNome(string nome)
        {
            ComandoSQL.Parameters.Clear();
            if (nome == null)
            {
                ComandoSQL.CommandText = "SELECT * FROM CLIENTES ORDER BY NOME";
            }
            else
            {
                ComandoSQL.Parameters.AddWithValue("@NOME", nome);
                ComandoSQL.CommandText = "SELECT * FROM CLIENTES WHERE UPPER(NOME) LIKE UPPER(CONCAT('%',@NOME,'%')) ORDER BY NOME";
            }
            DataTable dt = ExecutaSelect();
            if (dt != null)
            {
                return CriaListaCliente(dt);
            }
            else
                return null;
        }

        public Cliente CriaCliente(DataRow linha)
        {
            if (linha != null)
            {
                Cliente cliente = new Cliente();
                cliente.Id = Convert.ToInt32(linha["ID"].ToString());
                cliente.Nome = linha["NOME"].ToString();
                cliente.DataNascimento = !String.IsNullOrEmpty(linha["DATA_NASCIMENTO"].ToString()) ? Convert.ToDateTime(linha["DATA_NASCIMENTO"]) : cliente.DataNascimento;
                cliente.Sexo = linha["SEXO"].ToString();
                cliente.Cep = linha["CEP"].ToString();
                cliente.Endereco = linha["ENDERECO"].ToString();
                cliente.Numero = linha["NUMERO"].ToString();
                cliente.Complemento = linha["COMPLEMENTO"].ToString();
                cliente.Bairro = linha["BAIRRO"].ToString();
                cliente.Estado = linha["ESTADO"].ToString();
                cliente.Cidade = linha["CIDADE"].ToString();
                return cliente;
            }
            else
            {
                return null;
            }
        }

        public List<Cliente> CriaListaCliente(DataTable dt)
        {
            if (dt != null)
            {
                List<Cliente> clientes = new List<Cliente>();
                foreach (DataRow linha in dt.Rows)
                {
                    clientes.Add(CriaCliente(linha));
                }
                return clientes;
            }
            else
            {
                return null;
            }
        }

        public bool TestaConexao()
        {
            if (AbreConexao())
            {
                FechaConexao();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}