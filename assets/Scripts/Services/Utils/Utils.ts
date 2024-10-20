
export class Utils {
    static randomArr(arr:any[]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

    static randomFromTo(min:number, max:number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}


