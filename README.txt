Pontos de Atenção
--------------------

* Projeto desenvolvido em AspNetCore 3.1 e Angular

* Necessário VsCode com extensões para rodar o mesmo.

* Necessário SDK 3.1 do AspNetCore instalado (https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.402-windows-x64-installer)

* Script do banco com a criação da tabela está na raiz do projeto (.\crmall\script_banco.sql)

* A string de conexão está no arquivo .\crmall\DAO\Banco.cs, ajusta-la com nome da base, usuário, senha, host, etc. de acordo onde o script foi rodado

* Acessar a pasta .\crmall\ClientApp e rodar o comando "npm install" para que as dependências do projeto sejam instaladas.

* Na mesma pasta acima, rodar o comando "ng serve"

* Debuggar o projeto com .NET Core Launch (web)