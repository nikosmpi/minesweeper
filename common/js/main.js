function initMines() {
	const appElement = document.querySelector('.mines');
	if (appElement) {
		const app = new Vue({
			el: appElement,
			data: {
				tempDimension: 0,
				mines: 10,
				gridDimension: 10,
				grid: []
			},
			created() {
				this.putMines();
			},
			computed: {
				
			},
			methods: {
				cellTextShow(i,j) {
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					return this.grid[selected].revealed;
				},
				cellText(i,j){
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					const minecount = [];
					const fromI = i - 1 === 0 ? i : i - 1;
					const toI = i + 1 === 11 ? i : i + 1;
					const fromJ = j - 1 === 0 ? j : j - 1;
					const toJ = j + 1 === 11 ? j : j + 1;
					for(let l = fromI; l <= toI; l++) {
						for(let k = fromJ; k <= toJ; k++) {
							const selected = this.grid.findIndex(g => l === g.i && k === g.j);
							if(this.grid[selected].mine) {
								minecount.push(true);
							}
						}
					}
					return !this.grid[selected].mine ? minecount.length : null;
				},
				cellInfo(i,j) {
					const selected = this.grid.findIndex(g => i === g.i && j === g.j);
					const isMine = this.grid[selected].mine;
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
					this.grid[selected].revealed = true;
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
								i, j, mine: false, revealed: false
							});
						}
					}
					for(let mine of mines) {
						this.grid[mine].mine = true;
					}
					
				}
			}
		});
	}
}

window.addEventListener('DOMContentLoaded', () => {
    initMines();
});