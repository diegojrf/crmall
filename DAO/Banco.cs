using System;
using System.Data;
using MySqlConnector;

namespace crmall.DAO
{
    public class Banco
    {
        private string _strConexao;
        private MySqlCommand _comandoSQL;
        protected MySqlCommand ComandoSQL
        {
            get { return _comandoSQL; }
            set { _comandoSQL = value; }
        }
        private MySqlConnection _conn;

        protected Banco()
        {
            _strConexao = @"Server=localhost:3306;Database=sys;Uid=root;Pwd=diego123456;";
            _conn = new MySqlConnection(_strConexao);
            _comandoSQL = new MySqlCommand();
            _comandoSQL.Connection = _conn;
        }

        protected Banco(string stringConexao)
        {
            _strConexao = stringConexao;
            _conn = new MySqlConnection(_strConexao);
            _comandoSQL = new MySqlCommand();
            _comandoSQL.Connection = _conn;
        }

        protected bool AbreConexao()
        {
            try
            {
                _conn.Open();
                return true;
            }
            catch
            {
                return false;
            }
        }

        protected bool FechaConexao()
        {
            try
            {
                if (_conn.State == ConnectionState.Open)
                    _conn.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        protected bool ExecutaComando()
        {
            if (_comandoSQL.CommandText.Trim() == string.Empty)
                throw new Exception("Não há instrução SQL a ser executada.");

            bool retorno = false;
            AbreConexao();
            try
            {
                if (_comandoSQL.ExecuteNonQuery() > 0)
                {
                    retorno = true;
                }
            }
            catch (Exception ex)
            {
                retorno = false;
                Console.WriteLine(ex.Message + " - Dentro do ExecutaComando.");
                Console.WriteLine(ex);
                throw new Exception("Erro ao executar o comando SQL:", ex);
            }
            return retorno;
        }

        protected DataTable ExecutaSelect()
        {
            if (_comandoSQL.CommandText.Trim() == string.Empty)
                throw new Exception("Não há instrução SQL a ser executada.");

            AbreConexao();
            DataTable dt = new DataTable();
            try
            {
                dt.Load(_comandoSQL.ExecuteReader());
            }
            catch (Exception ex)
            {
                dt = null;
                throw new Exception("Erro ao executar o comando SQL: ", ex);
            }
            finally
            {
                FechaConexao();
            }
            return dt;
        }
    }
}