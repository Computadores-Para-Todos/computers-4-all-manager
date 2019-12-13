# Computers for all - manager

Este repositório contem dois projetos do [Computadores para todos](https://www.computadoresparatodos.com.br/); a API e o sistema de gestão.

Estamos nos primeiros passos, então utilize as issues para comentar, sugerir e perguntar.

Para acompanhar as issues e o que precisa ser feito consulte [Versão de desenvolvimento pronta para crescer](https://github.com/Computadores-Para-Todos/computers-4-all-manager/projects/1).

# Para começar

1 - Clonar o projeto
``` 
git clone https://github.com/Computadores-Para-Todos/computers-4-all-manager.git
```

2 - Instalar NVM (ou garantir que esteja usando o node versão 11.x)
``` 
https://github.com/nvm-sh/nvm
```

3 - Ir para o branch dev, e criar um novo branch para a issue que está. Exemplo:
```
git checkout dev
git checkout -b 12-criar-form-usuario
``` 

### Setup da API
1 - Instalar pacotes da API
```
cd api
npm install
```
2 - Criar uma cópia o arquivo `.env.sample` para `.env`
```
cp .env-sample .env 
```
3 - Criar database local e informar os parâmetros de conexão no arquivo `.env` 
4 - Rodar a API
```
nvm use
npm start
```

🎉🎉🎉

Neste momento seu terminal deve dizer que a API está rodando em [http://localhost:3001/](http://localhost:3000), e informando sucesso ou falha em conexão com o banco de dados.

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

🎉🎉🎉

Agora seu terminal irá iniciar o servidor local para o react e abrir o navegador com algum conteúdo inicial.

# Mais informações e ferramentas

## Lint

O projeto tem um padrão de códigos que é imposto pelo ESLint, é preciso ativar o ESLint e o Pretier na sua IDE para que ela te avise quando algo estiver faltando ou fora do padrão. Todos alertas devem ser resolvidos, porque o Husky não irá deixar subir código fora do padrão.

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
