class QuberMatrix {
    constructor(word) {
        this.word = word;
        this.len = word.length;
        this.mtx = new Array(this.len * 2);

        for (let i = 0; i < this.mtx.length; i++) {
            this.mtx[i] = new Array(this.len * 2);
        }
    }

    wordToRow(offset) {
        for (let i = 0; i < this.len; i++) {
            this.mtx[offset][i + offset] = this.word[i];
        }
    }

    wordToRowBackwards(offset) {
        for (let i = this.len; i > 0; i--) {
            this.mtx[offset + this.len - 1][offset + i - 1] = this.word[this.len - i];
        }
    }

    wordToColumn(offset) {
        for (let i = 0; i < this.len; i++) {
            this.mtx[i + offset][offset] = this.word[i];
        }
    }

    wordToColumnBackwards(offset) {
        for (let i = this.len; i > 0; i--) {
            this.mtx[i + offset - 1][offset + this.len - 1] = this.word[this.len - i];
        }
    }

    writeHalfBoard(offset = 0) {
        this.wordToRow(offset);
        this.wordToColumn(offset);
    }

    writeHalfBoardBackwards(offset = 0) {
        this.wordToRowBackwards(offset);
        this.wordToColumnBackwards(offset);
    }

    writeFullBoard(offset = 0) {
        this.writeHalfBoard(offset);
        this.writeHalfBoardBackwards(offset);
    }

    drawMultiple(letter, x, y, times) {
        for (let i = 0; i < times; i++) {
            this.mtx[y++][x++] = letter;
        }
    }

    materialize() {
        let xLen = this.mtx.length;
        let yLen = this.mtx[0].length;
        let sb = [];

        for (let x = 0; x < xLen; x++) {
            for (let y = 0; y < yLen; y++) {
                let value = this.mtx[x][y];
                sb.push(value ? value : " ");
            }
            sb.push('\n');
        }

        return sb.join('').trim();
    }
}

const err_msg = 'A palavra deve no mínimo três caracteres';

class Quber {
    static to2dSimple(word) {
        if (!word || word.length < 3)
            return err_msg;

        let mtx = new QuberMatrix(word);
        mtx.writeHalfBoard();
        return mtx.materialize();
    }

    static to2dFull(word) {
        if (!word || word.length < 3)
            return err_msg;

        let mtx = new QuberMatrix(word);
        mtx.writeFullBoard();
        return mtx.materialize();
    }

    static to3d(word) {
        if (!word || word.length < 3)
            return err_msg;

        let mtx = new QuberMatrix(word);
        let rawOffset = Math.floor(mtx.len/2);
        let offset = mtx.len > 7 ? rawOffset - 1 : rawOffset;

        mtx.writeFullBoard();
        mtx.writeFullBoard(offset);

        mtx.drawMultiple('\\', 1, 1, offset - 1);
        mtx.drawMultiple('\\', 1, mtx.len, offset - 1);
        mtx.drawMultiple('\\', mtx.len, 1, offset - 1);
        mtx.drawMultiple('\\', mtx.len, mtx.len, offset - 1);

        return mtx.materialize();
    }
}