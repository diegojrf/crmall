using crmall.Model;
using Microsoft.AspNetCore.Mvc;

namespace crmall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        [HttpPost]
        public bool Gravar([FromBody] Cliente cliente)
        {

        }
    }
}