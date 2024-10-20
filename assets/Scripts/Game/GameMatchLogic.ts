import { Utils } from "../Services/Utils/Utils";

class piece {
    col: number;
    row: number;
    kind: number;
    match: number;
    alpha: number;
    constructor() { this.match = 0; this.alpha = 255; }
}


export class GameMatchLogic {
    private grid: piece[][] = [];
   
    public get Grid(): piece[][] {
        return this.grid;
    }

    update(deltaTime: number) {

    }

    swap(p1: piece, p2: piece) {
        [p1, p2] = [p2, p1];

        this.grid[p1.row][p1.col] = p1;
        this.grid[p2.row][p2.col] = p2;
    }

    moving() {
        for (let i = 8; i > 0; i--)
            for (let j = 1; j <= 8; j++)
                if (this.grid[i][j].match)
                    for (let n = i; n > 0; n--)
                        if (!this.grid[n][j].match) { this.swap(this.grid[n][j], this.grid[i][j]); break; };

        for (let j = 1; j <= 8; j++)
            for (let i = 8, n = 0; i > 0; i--)
                if (this.grid[i][j].match) {
                    // this.grid[i][j].kind = rand() % 7;
                    // this.grid[i][j].y = -ts * n++;
                    this.grid[i][j].match = 0;
                    this.grid[i][j].alpha = 255;
                }
    }

    setup() {
        for (let i = 1; i <= 8; i++)
            for (let j = 1; j <= 8; j++) {
                this.grid[i][j].kind= Utils.randomFromTo(0,5);
                this.grid[i][j].col = j;
                this.grid[i][j].row = i;
            }

    }

    Matchfinding() {
        for (let i = 1; i <= 8; i++)
            for (let j = 1; j <= 8; j++) {
                if (this.grid[i][j].kind == this.grid[i + 1][j].kind)
                    if (this.grid[i][j].kind == this.grid[i - 1][j].kind)
                        for (let n = -1; n <= 1; n++) this.grid[i + n][j].match++;

                if (this.grid[i][j].kind == this.grid[i][j + 1].kind)
                    if (this.grid[i][j].kind == this.grid[i][j - 1].kind)
                        for (let n = -1; n <= 1; n++) this.grid[i][j + n].match++;
            }
    }

    mouseClick(x0: number, y0: number, x: number, y: number) {
        this.swap(this.grid[y0][x0], this.grid[y][x])
    }
    
    



}


