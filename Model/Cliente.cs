using System;
using System.ComponentModel.DataAnnotations;

namespace crmall.Model
{
    public class Cliente
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Preencha o Nome")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Preencha a Data de Nascimento")]
        public DateTime DataNascimento { get; set; }
        [Required(ErrorMessage = "Informe o Sexo")]
        public string Sexo { get; set; }
        public string Cep { get; set; }
        public string Endereco { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
    }
}