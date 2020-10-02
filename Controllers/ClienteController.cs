using System;
using System.Collections.Generic;
using crmall.DAO;
using crmall.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace crmall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        [HttpPost]
        public ActionResult<object> Gravar([FromBody] Cliente cliente)
        {
            if (cliente != null && ModelState.IsValid)
            {
                if (cliente.DataNascimento >= DateTime.Today)
                {
                    List<object> erros = new List<object>();
                    erros.Add(new { campo = "DataNascimento", msg = "Data deve ser menor que a data atual" });
                    return BadRequest(erros);
                }
                if (new ClienteDAO().Grava(cliente))
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            else
            {
                return BadRequest(ListaErros(ModelState));
            }
        }

        [HttpDelete]
        public bool Excluir(int id)
        {
            if (id > 0)
            {
                return new ClienteDAO().Exclui(id);
            }
            else
            {
                return false;
            }
        }

        [HttpGet]
        public List<Cliente> BuscarClientes(string chave)
        {
            return new ClienteDAO().BuscaNome(chave);
        }

        public static object ListaErros(ModelStateDictionary model)
        {
            List<object> erros = new List<object>();
            foreach (var keys in model.Keys)
            {
                var valor = model[keys];
                foreach (var erro in valor.Errors)
                {
                    erros.Add(new { campo = keys, msg = erro.ErrorMessage });
                }
            }
            return erros;
        }

        [HttpGet("conexao")]
        public bool TestarConexao()
        {
            return new ClienteDAO().TestaConexao();
        }
    }
}