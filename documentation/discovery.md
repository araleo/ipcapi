# Definindo o sistema

## Django vs Flask vs FastAPI

Um dos requisitos do sistema é que o backend seja escrito em Python, mas não há exigência a respeito de qual framework deve ser utilizado. Django, Flask e FastAPI são atualmente as três opções mais populares, cada um com suas vantagens e desvantagens. Por se tratar de um projeto simples, em que a performance da API não será o gargalo do sistema, utilizaremos Django como framework de escolha. Django é um framework robusto e escalável, com boas interfaces, bom ORM, e segurança razoável.

## Como e com que frequência consultar a api do BCB para extrair dados?

Inicialmente vamos extrair todos os dados existentes da API do BCB e salvar em nosso banco de dados como carga inicial. Para a continuidade, o IPCA é atualizado mensalmente, logo poderíamos em tese realizar apenas um request por mês para a API do BCB e armazenar o resultado. Contudo, caso ocorra algum erro ou o índice seja alterado por qualquer razão, nosso banco estaria incorreto.
Realizar um request para a API do BCB para cada request feito em nossa API pode ser ruim por dois motivos: primeiro, se a API do BCB estiver lenta ou indisponível no momento, isso pode atrasar nosso cliente, segundo que caso nossa API receba muitas requisições, podemos sofrer alguma limitação vinda da API do BCB, impedindo nosso serviço.
Um meio termo seria atualizar nosso banco de dados diariamente, fazendo uma requisição diária para a API do BCB, para capturar novos dados a medida que são disponibilizados e periodicamente (mensalmente ou a cada duas semanas) para conferir se os dados que estão em nosso banco ainda estão em conformidade com os dados disponibilizados pelo BCB (se nenhum dado foi alterado no sistema do BCB).


## Banco de dados. Qual usar?

Os dados disponibilizados pela API do BCB são simples e em formato JSON, o mesmo formato que pretendemos usar em nossa API. Utilizar um banco de dados de documentos como MongoDB poderia ser uma boa escolha. Mas, para demonstrar o uso de bancos de dados SQL em uma API REST e também tirar proveito do ORM do Django, vamos utilizar um banco SQL. Pela simplicidade do projeto, podemos utilizar uma instância SQLite sem maiores prejuízos, sabendo que será fácil fazer a troca para um banco SQL mais potente se necessário no decorrer da vida da aplicação.
