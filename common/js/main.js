function initMines() {
	const appElement = document.querySelector('.mines');
	if (appElement) {
		const app = new Vue({
			el: appElement,
			data: {
				tempDimension: 0,
				mines: 25,
				gridDimension: 10,
				grid: [],
				gameOver: false
			},
			created() {
				this.putMines();
			},
			computed: {
				youWin() {
					const checkBlocks = [];
					for(let g of this.grid){
						if(!g.revealed) {
							checkBlocks.push(true);
						}
					}
					return checkBlocks.length === this.mines;
				}
			},
			methods: {
				resetGame() {
					this.putMines();
					this.gameOver = false;
				},
				cellTextShow(i,j) {
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					return this.grid[selected].revealed;
				},				
				cellText(i,j){
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					return this.grid[selected].number !== -1 ? this.grid[selected].number : null;
				},
				cellInfo(i,j) {
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					const isMine = this.grid[selected].number === -1;
					const isRevealed = this.grid[selected].revealed;
					return {
							'mine': isMine && isRevealed,
							'revealed' : !isMine && isRevealed,
						}
				},
				setDimension() {
					if(parseInt(this.tempDimension) > 0) {
						this.gridDimension = this.tempDimension;
					}
				},
				clickCell(i,j) {
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					if(this.grid[selected].number === -1) {
						this.grid[selected].revealed = true;
						this.gameOver = true;
					} else if(this.grid[selected].number === 0) {
						this.floodCell(selected);
					} else {
						this.grid[selected].revealed = true;
					}
				},
				floodCell(thisSelected) {
					const i = this.grid[thisSelected].i;
					const j = this.grid[thisSelected].j;
					const fromI = i - 1 === 0 ? i : i - 1;
					const toI = i + 1 === this.gridDimension + 1 ? i : i + 1;
					const fromJ = j - 1 === 0 ? j : j - 1;
					const toJ = j + 1 === this.gridDimension + 1 ? j : j + 1;
					for(let l = fromI; l <= toI; l++) {
						for(let k = fromJ; k <= toJ; k++) {
							const selected = this.grid.findIndex(g => l === g.i && k === g.j);
							if(this.grid[selected].number >= 0 && !this.grid[selected].revealed) {
								this.grid[selected].revealed = true;
								this.floodCell(selected);
							}
						}
					}	
				},
				putMines() {
					const mines = [];
					const dimension = this.gridDimension * this.gridDimension;
					for (let i = 1; i <= this.mines; i++) {
						let isSame, num;
						do {
							num = Math.floor((Math.random() * dimension));
							const findNum = mines.find((e) => e === num);
							isSame = findNum ? true :false;
						} while (isSame);
						mines.push(num);
					}
					this.grid = [];
					for (let i = 1; i <= this.gridDimension; i++) {
						for (let j = 1; j <= this.gridDimension; j++) {
							this.grid.push({
								i, j, revealed: false, number: 0
							});
						}
					}
					for(let mine of mines) {
						this.grid[mine].number = -1;
					}
					for (let i = 1; i <= this.gridDimension; i++) {
						for (let j = 1; j <= this.gridDimension; j++) {
							const thisMine = this.grid.findIndex(g => i === g.i && j === g.j);
							const fromI = i - 1 === 0 ? i : i - 1;
							const toI = i + 1 === this.gridDimension + 1 ? i : i + 1;
							const fromJ = j - 1 === 0 ? j : j - 1;
							const toJ = j + 1 === this.gridDimension + 1 ? j : j + 1;
							for(let l = fromI; l <= toI; l++) {
								for(let k = fromJ; k <= toJ; k++) {
									const selected = this.grid.findIndex(g => l === g.i && k === g.j);
									if(this.grid[selected].number === -1 && this.grid[thisMine].number !== -1) {
										this.grid[thisMine].number = this.grid[thisMine].number + 1;
									}
								}
							}
						}
					}
				}
			}
		});
	}
}

window.addEventListener('DOMContentLoaded', () => {
    initMines();
});