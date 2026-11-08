class CampoMinado {
    constructor(linhas = 18, colunas = 14, bombas = []) {
        if (linhas !== 18 || colunas !== 14) throw new Error('O tabuleiro deve ser 18 x 14.');
        if (bombas.length !== 40) throw new Error('O tabuleiro deve possuir 40 bombas.');
        this.linhas = linhas; this.colunas = colunas;
        this.bombas = new Set(bombas.map(p => this.chave(p.linha, p.coluna)));
        this.reveladas = new Set(); this.marcadas = new Set(); this.status = 'em_andamento';
    }
    chave(linha, coluna) { return `${linha},${coluna}`; }
    valido(linha, coluna) { return linha >= 0 && linha < this.linhas && coluna >= 0 && coluna < this.colunas; }
    vizinhos(linha, coluna) { const r = []; for (let dl = -1; dl <= 1; dl++) for (let dc = -1; dc <= 1; dc++) if ((dl || dc) && this.valido(linha + dl, coluna + dc)) r.push(this.chave(linha + dl, coluna + dc)); return r; }
    bombasAdjacentes(linha, coluna) { return this.vizinhos(linha, coluna).filter(p => this.bombas.has(p)).length; }
    revelar(linha, coluna) {
        if (!this.valido(linha, coluna)) throw new Error('Posição inválida.');
        const pos = this.chave(linha, coluna);
        if (this.marcadas.has(pos)) throw new Error('A posição está marcada.');
        if (this.bombas.has(pos)) { this.reveladas.add(pos); this.status = 'perdeu'; return 'bomba'; }
        this.reveladas.add(pos); if (this.reveladas.size === this.linhas * this.colunas - this.bombas.size) this.status = 'venceu'; return this.bombasAdjacentes(linha, coluna);
    }
    marcar(linha, coluna) { if (!this.valido(linha, coluna)) throw new Error('Posição inválida.'); const p = this.chave(linha, coluna); if (this.marcadas.has(p)) this.marcadas.delete(p); else this.marcadas.add(p); return this.marcadas.has(p); }
}
module.exports = { CampoMinado };
