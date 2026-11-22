# desafio_teste_campo_minado

Projeto de testes automatizados de **Campo Minado**.

## 1. Colaborador(es)

- Colaborador 1: Heloísa Sayuri Silva Saito

- Colaborador 2: Maria Eduarda de Castro Lachimia

## 2. Especificação do desafio

O desafio consiste em criar casos de teste em JavaScript para tabuleiro 18 x 14 com 40 bombas.

## 3. Estrutura do projeto

```
.
├── package.json
├── README.md
├── src/
│   └── CampoMinado.js
└── tests/
    └── CampoMinado.test.js
```

- `src/CampoMinado.js`: implementação da classe testada.

- `tests/CampoMinado.test.js`: casos de teste automatizados.

## 4. Funcionamento dos casos de teste

Os testes usam Jest e seguem três etapas: preparar o jogo, executar uma ação e verificar o resultado esperado com `expect`.

Casos testados: criação do tabuleiro, revelação de casa segura, identificação de bomba, marcação, posição inválida e quantidade de bombas.

## 5. Instalação e execução

```bash
npm install
npm test
```

Para cobertura:

```bash
npm run test:coverage
```

## 6. Observações do enunciado

- A realização dos desafios é opcional.

- O trabalho pode ser feito em dupla.

- As contribuições dos integrantes devem aparecer no repositório.

- Serão considerados no máximo 5 desafios entregues.

- O repositório segue o padrão de nomenclatura exigido: `desafio_teste_campo_minado`.
