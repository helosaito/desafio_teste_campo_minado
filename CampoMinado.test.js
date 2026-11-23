const test = require('node:test');
const assert = require('node:assert/strict');
const { CampoMinado } = require('./CampoMinado');

function criarBombas() {
    const bombas = [];
    for (let linha = 0; linha < 18 && bombas.length < 40; linha += 1) {
        for (let coluna = 0; coluna < 14 && bombas.length < 40; coluna += 1) {
            bombas.push({ linha, coluna });
        }
    }
    return bombas; 
}

function criarJogo(bombas = criarBombas()) {
    return new CampoMinado(18, 14, bombas);
}

test('cria tabuleiro 18 por 14 com quarenta bombas', () => {
    const jogo = criarJogo();
    assert.equal(jogo.linhas, 18);
    assert.equal(jogo.colunas, 14);
    assert.equal(jogo.bombas.size, 40);
    assert.equal(jogo.status, 'em_andamento');
});

test('rejeita dimensões ou quantidade de bombas inválidas', () => {
    assert.throws(() => new CampoMinado(17, 14, criarBombas()), /18 x 14/);
    assert.throws(() => criarJogo(criarBombas().slice(1)), /40 posições de bomba/);
});

test('rejeita posições de bomba duplicadas, fracionárias ou fora do tabuleiro', () => {
    const duplicadas = criarBombas();
    duplicadas[39] = { ...duplicadas[0] };
    assert.throws(() => criarJogo(duplicadas), /posições distintas/);

    const fracionarias = criarBombas();
    fracionarias[0] = { linha: 1.5, coluna: 0 };
    assert.throws(() => criarJogo(fracionarias), /posição inteira válida/);

    const foraDoTabuleiro = criarBombas();
    foraDoTabuleiro[0] = { linha: 18, coluna: 0 };
    assert.throws(() => criarJogo(foraDoTabuleiro), /posição inteira válida/);
});

test('conta bombas adjacentes e revela uma casa segura', () => {
    const jogo = criarJogo();
    assert.equal(jogo.bombasAdjacentes(3, 0), 2);
    assert.equal(jogo.revelar(3, 0), 2);
    assert.equal(jogo.status, 'em_andamento');
    assert.equal(jogo.reveladas.size, 1);
});

test('revelar uma bomba encerra a partida com derrota', () => {
    const jogo = criarJogo();
    assert.equal(jogo.revelar(0, 0), 'bomba');
    assert.equal(jogo.status, 'perdeu');
    assert.throws(() => jogo.revelar(3, 0), /não está em andamento/);
});

test('marcação alterna e bloqueia a revelação enquanto ativa', () => {
    const jogo = criarJogo();
    assert.equal(jogo.marcar(5, 5), true);
    assert.throws(() => jogo.revelar(5, 5), /está marcada/);
    assert.equal(jogo.marcar(5, 5), false);
    assert.equal(jogo.revelar(5, 5), 0);
});

test('rejeita posições inválidas e revelação repetida', () => {
    const jogo = criarJogo();
    assert.throws(() => jogo.revelar(18, 0), /Posição inválida/);
    assert.throws(() => jogo.revelar(1.5, 0), /Posição inválida/);
    assert.throws(() => jogo.marcar(0, 14), /Posição inválida/);
    jogo.revelar(5, 5);
    assert.throws(() => jogo.revelar(5, 5), /já foi revelada/);
});

test('vence quando todas as casas sem bomba são reveladas', () => {
    const bombas = criarBombas();
    const jogo = criarJogo(bombas);
    const posicoesComBomba = new Set(
        bombas.map(({ linha, coluna }) => `${linha},${coluna}`)
    );
    for (let linha = 0; linha < jogo.linhas; linha += 1) {
        for (let coluna = 0; coluna < jogo.colunas; coluna += 1) {
            if (!posicoesComBomba.has(`${linha},${coluna}`)) {
                jogo.revelar(linha, coluna);
            }
        }
    }
    assert.equal(jogo.status, 'venceu');
});
