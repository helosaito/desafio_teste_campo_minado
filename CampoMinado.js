class CampoMinado {
    constructor(linhas = 18, colunas = 14, bombas) {
        if (linhas !== 18 || colunas !== 14) {
            throw new Error('O tabuleiro deve ser 18 x 14.');
        }
        if (!Array.isArray(bombas) || bombas.length !== 40) {
            throw new Error('O tabuleiro deve possuir 40 posições de bomba.');
        }

        this.linhas = linhas;
        this.colunas = colunas;
        const posicoes = bombas.map((bomba) => {
            if (
                !bomba ||
                !Number.isInteger(bomba.linha) ||
                !Number.isInteger(bomba.coluna) ||
                !this.valido(bomba.linha, bomba.coluna)
            ) {
                throw new Error('Cada bomba deve ter uma posição inteira válida.');
            }
            return this.chave(bomba.linha, bomba.coluna);
        });
        if (new Set(posicoes).size !== 40) {
            throw new Error('As 40 bombas devem ocupar posições distintas.');
        }

        this.bombas = new Set(posicoes);
        this.reveladas = new Set();
        this.marcadas = new Set();
        this.status = 'em_andamento';
    }

    chave(linha, coluna) {
        return `${linha},${coluna}`;
    }

    valido(linha, coluna) {
        return Number.isInteger(linha) &&
            Number.isInteger(coluna) &&
            linha >= 0 &&
            linha < this.linhas &&
            coluna >= 0 &&
            coluna < this.colunas;
    }

    exigirPosicaoValida(linha, coluna) {
        if (!this.valido(linha, coluna)) {
            throw new Error('Posição inválida.');
        }
    }

    exigirPartidaEmAndamento() {
        if (this.status !== 'em_andamento') {
            throw new Error('A partida não está em andamento.');
        }
    }

    vizinhos(linha, coluna) {
        this.exigirPosicaoValida(linha, coluna);
        const resultado = [];
        for (let deltaLinha = -1; deltaLinha <= 1; deltaLinha += 1) {
            for (let deltaColuna = -1; deltaColuna <= 1; deltaColuna += 1) {
                if (deltaLinha === 0 && deltaColuna === 0) {
                    continue;
                }
                const linhaVizinha = linha + deltaLinha;
                const colunaVizinha = coluna + deltaColuna;
                if (this.valido(linhaVizinha, colunaVizinha)) {
                    resultado.push(this.chave(linhaVizinha, colunaVizinha));
                }
            }
        }
        return resultado;
    }

    bombasAdjacentes(linha, coluna) {
        return this.vizinhos(linha, coluna)
            .filter((posicao) => this.bombas.has(posicao))
            .length;
    }

    revelar(linha, coluna) {
        this.exigirPartidaEmAndamento();
        this.exigirPosicaoValida(linha, coluna);
        const posicao = this.chave(linha, coluna);
        if (this.marcadas.has(posicao)) {
            throw new Error('A posição está marcada.');
        }
        if (this.reveladas.has(posicao)) {
            throw new Error('A posição já foi revelada.');
        }
        if (this.bombas.has(posicao)) {
            this.reveladas.add(posicao);
            this.status = 'perdeu';
            return 'bomba';
        }

        this.reveladas.add(posicao);
        if (this.reveladas.size === this.linhas * this.colunas - this.bombas.size) {
            this.status = 'venceu';
        }
        return this.bombasAdjacentes(linha, coluna);
    }

 
   marcar(linha, coluna) {
        this.exigirPartidaEmAndamento();
        this.exigirPosicaoValida(linha, coluna);
        const posicao = this.chave(linha, coluna);
        if (this.marcadas.has(posicao)) {
            this.marcadas.delete(posicao);
            return false;
        }
        this.marcadas.add(posicao);
        return true;
    }
}

module.exports = { CampoMinado };
