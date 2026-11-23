# Campo Minado — Desafio de Testes

## Desafio

O desafio é elaborar testes automatizados para Campo Minado. A implementação completa do jogo não é obrigatória na atividade; este repositório inclui uma implementação de referência para os testes.

A especificação registrada no README auditado informa um tabuleiro de 18 linhas por 14 colunas, com 40 bombas. O enunciado auditado não detalha todas as regras do jogo. A implementação recebe explicitamente as posições das bombas, valida suas coordenadas, calcula bombas adjacentes, permite revelar e marcar casas, registra derrota ao revelar uma bomba e vitória ao revelar todas as casas seguras. Regras adicionais não devem ser atribuídas ao enunciado sem consultar sua versão completa.

## Colaboradores

- Heloísa Sayuri Silva Saito

- Maria Eduarda de Castro Lachimia

## Arquivos

- `CampoMinado.js`: implementação da classe.

- `CampoMinado.test.js`: testes com `node:test` e `node:assert/strict`.

## Casos de teste

| Caso | O que verifica |
| --- | --- |
| Cria tabuleiro 18 por 14 com quarenta bombas | As dimensões, a quantidade de posições distintas e o estado inicial são os esperados. |
| Rejeita dimensões ou quantidade de bombas inválidas | Dimensão diferente e lista com quantidade errada de bombas são rejeitadas. |
| Rejeita posições de bomba duplicadas, fracionárias ou fora do tabuleiro | Coordenadas repetidas, não inteiras ou fora do intervalo são rejeitadas. |
| Conta bombas adjacentes e revela uma casa segura | A contagem da vizinhança é correta, a casa segura é revelada e a partida continua. |
| Revelar uma bomba encerra a partida com derrota | A ação retorna `bomba`, altera o status para `perdeu` e bloqueia ações posteriores. |
| Marcação alterna e bloqueia a revelação enquanto ativa | A marca pode ser colocada e removida; uma casa marcada não pode ser revelada. |
| Rejeita posições inválidas e revelação repetida | Coordenadas fora do tabuleiro, fracionárias e casas já reveladas são rejeitadas. |
| Vence quando todas as casas sem bomba são reveladas | A revelação de todas as casas seguras altera o status para `venceu`. |

## Como executar

Requer Node.js 18 ou superior. Não há dependências externas. Na pasta deste projeto, execute:

```bash
node --test
```
