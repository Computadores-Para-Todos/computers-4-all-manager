# Computers for all - manager

O [Computadores para todos](https://www.computadoresparatodos.com.br/) é um projeto social que recebe doação de computadores usados, os renova, e doa para jóvens de comuinidades menos favorecidas. Atualmente o projeto acontece apenas em Juiz de Fora, mas, através deste sistema, poderá expandir para outras cidades.
 
# Este repositório

Este repositório contém dois projetos; a API (backend node) e o sistema de gestão (frontend react).

# Como colaborar

O primeiro é assistir (mesmo que por alto) o video abaixo para entender o projeto, entender o sistema e saber como serão geridas as tarefas. Clique para abrir no Youtube.

[![Video do Youtube](https://img.youtube.com/vi/xdzaJtn-r3M/0.jpg)](https://www.youtube.com/watch?v=xdzaJtn-r3M)

## Vantagens de participar

## Como participar

- Veja as tarefas atuais (coluna "To do"), pelos boards do [projeto](https://github.com/Computadores-Para-Todos/computers-4-all-manager/projects/)
- Leia as tarefas em "To do" e veja se pode pegar alguma delas
- Comente na issue, ou até fale diretamente conosco pelo grupo do whatsapp, para entender melhor o que precisa ser feito, como fazer, conhecer os detalhes
- Se estiver tudo ok, marque a issue para você e mova para "Doing"
- Crie um branch a partir do `dev`, de acordo com o ID e nome da issue, exemplo: `30-preparar-ambiente-producao`
- Trabalhe no seu branch e interaja sempre que achar necessário
- Ao final, de push no seu branch para o repositório e abra um [Pull Request](https://github.com/Computadores-Para-Todos/computers-4-all-manager/pulls) do seu branch para `dev`
- Mova o card da sua issue no projeto para "Validating" e aguarde os comentários e observações
- Se tudo estiver certo seu PR será aceito, e seu código será mergeado para o branch principal `dev` 
- Sucesso, você mandou bem demais 🎉

# Como começar

Você precisará rodar a API e o frontend em dois terminais diferentes, ao mesmo tempo, para ver o projeto funcionar. Opcionalmente você pode executar o Storybook, que é onde todos os componentes estão organizados.

Segue um passo a passo para rodar o projeto localmente:

1 - Clone o projeto
``` 
git clone https://github.com/Computadores-Para-Todos/computers-4-all-manager.git
```

2 - Instale o NVM (ou garanta que esteja usando o node versão 11.x)
``` 
https://github.com/nvm-sh/nvm
```

3 - Vá para o branch `dev`, e criae um novo branch para a issue que está. Exemplo:
```
git checkout dev
git checkout -b 12-criar-form-usuario
``` 

### Setup da API
1 - Instalar pacotes da API
```bash
cd api
npm install
```
2 - Criar uma cópia o arquivo `.env.sample` para `.env`
```bash
cp .env-sample .env 
```

3 - Criar database local e informar os parâmetros de conexão no arquivo `.env` (caso tenha Docker/Compose instalado, pode usar e configurar o banco de desenvolvimento no arquivo `api/docker-compose.yml` - `npm run database`)

4 - Rodar a API
```bash
nvm use
npm run dev
```

5 - 🎉🎉🎉 - Neste momento seu terminal deve dizer que a API está rodando em [http://localhost:3001/](http://localhost:3001), e informando sucesso ou falha em conexão com o banco de dados.

Para gerar um build de produção e executá-lo, basta rodar:
```bash
npm run build
npm start
```

### Setup do frontend
1 - Instalar pacotes do front
```
cd pwa
npm install
```
2 - Criar uma cópia o arquivo `.env.sample` para `.env`
```
cp .env-sample .env 
``` 
3 - Rodar o PWA
```
nvm use
npm start
```
4 - 🎉🎉🎉 - Seu terminal irá iniciar o servidor local do frontend react e abrirá [http://localhost:3000/](http://localhost:3000) em seu navedor.

### Executar o Storybook

1 - Abra um novo terminar na mesma pasta do PWA e execute:
```
npm run storybook
```

2 - 🎉🎉🎉 - Seu terminal irá iniciar o servidor local do storybook e abrirá [http://localhost:9009/](http://localhost:9009) em seu navedor. 

# Mais detalhes técnicos e ferramentas

## Lint

O projeto tem um padrão de códigos que é imposto pelo ESLint, é preciso ativar o ESLint e o Prettier na sua IDE para que ela te avise quando algo estiver faltando ou fora do padrão. Todos alertas devem ser resolvidos, porque o Husky não irá deixar subir código fora do padrão.

Estas são as regras em uso:

#### ESLint backend
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
- [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)

#### ESLint frontend
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

#### JSDoc
O ESLint irá pedir que use comentários em vários lugares, seguindo o padrão [JSDoc](https://devhints.io/jsdoc), pedindo para informar os tipos de parâmetros, retornos, etc.

## dotenv

O projeto utiliza o [dotenv](https://www.npmjs.com/package/dotenv) para carregar os arquivos de configurações (.env) em cada um dos projetos.

## Rollbar

Os erros do projeto (em produção) serão logados no [Rollbar](https://rollbar.com/), que é uma ferramenta bem útil. Não é obrigado utilizar em desenvolvimento.

## Husky

O [Husky](https://github.com/typicode/husky) irá validar todas as regras do ESLint antes de cada commit, e só deixará subir códigos que estejam 100% dentro das regras definidas.

## Semantic Ui

A interface está sendo construída usando [Semantic Ui](https://react.semantic-ui.com/).

## Integração contínua

Foi utilizado o Github Actions para algumas ações relevantes:
- A cada novo pull request será verificado se o código está de acordo com as regras do ESLint e Prettier, só permitindo o merge ser realizado se estiver tudo de acordo
- A cada merge para branch `dev` o projeto será "buildado" e enviado para o Heroku, ficando disponível como ambiente para validação online 
- A cada merge para branch `stagging` o mesmo acontece, ficando disponível em url de stagging 
- A cada merge para branch `master` o mesmo acontece, ficando disponível na url de produção 
