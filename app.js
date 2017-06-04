const isDigit = function(ch) {
 	return /\d/.test(ch);
 }

 const validate =  {
 	operators : (f, l) => {
 		const chr = ['+', '-', 'x', '/', '.', 'EXP', '='];
 		if(chr.includes(f) && chr.includes(l)){
 			if(f === l){
 				return 0;
 			}
 			return 1;
 		}
 		return 2;
 	}
 }

 const divMult = (str) => {
 	let result = 1;
 	let arr = [];
 	let arr1 = [];
 	let ans = '';
 	for(let i =0; i < str.length; i++ ){
 		if(str[i] === 'x' || str[i] === '/'){
 			arr.push(ans);
 			arr.push(str[i]);
 			ans = '';
 		}
 		else{
 			ans +=str[i];
 		}
 	}
 	
 	arr.push(ans);
 	
 	for(let v = 0; v < arr.length; v++){

 		if(arr[v] === '/'){
 			arr1.push(parseFloat(arr[v-1]) /parseFloat(arr[v+1]));
 		}
 		else if((isDigit(arr[v]) && arr[v+1] !== '/'  && arr[v-1] !== '/') || arr[v] === 'x'){
 			arr1.push(arr[v]);
 		}
 	}
 	
 	for(let u= 0; u < arr1.length; u++){
 		// if(u !== 0 && arr[u-1] === 'x'){
 		// 	continue;
 		// }
 		if(isDigit(arr1[u])){
 			result *= parseFloat(arr1[u]);
 		}
 	}
 	return result;
 };
const split = (str) => {
	let has = false;
	let arr = 0;
	let ans = '';
	for(let i=0; i < str.length; i++){
		if(i === 0 && (str[i] === '+' || str[i] === '-')){
			ans +=str[i];
		}
		else if(isDigit(str[i]) || str[i] === '.' || str[i] === 'x' || str[i] === '/'){
			ans +=str[i];
		}
		else if(str[i] === '+' || str[i] === '-'){
			if(has){
				arr+=divMult(ans);
			}
			else{
			  arr+=parseFloat(ans);
			}
			has = false;
			ans = str[i];
		}
		if(str[i] === 'x' || str[i] === '/'){
			has = true;
		}
	}
		if(has){
				arr+=divMult(ans);
			}
			else{
			  arr+=parseFloat(ans);
			}
	if(arr === parseInt(arr)){
		return parseInt(arr);
	}
	return arr;
};



class Numbers{
	constructor(){
		this.question = '';
		this.answer = '';
	}
	Value(value){
		if(value === '+' || value === '-' || value === 'x' || value === '/'){
			this.question = this.question  + ' ' + value + ' ';
			return this.question;
		}
		else{
			this.question = this.question + value;
			return this.question;
		}
		
	}
	getAnswer(){
		let x = this.question.replace(/\s/g,'');
		return  split(x);
	}
	clear(){
		this.question = '';
	}
	getLast(){
		if(this.question === ''){
			return '#';
		}
		let que = this.question.replace(/\s/g,'');
		return que[que.length -1];
	}
	replaceLast(ele){
		let que = this.question.split('');
		if(que[que.length -1] === ' '){
			que.pop();
			que.pop();
			que.push(ele);
			this.question = que.join('');
		}
		else{
			que.pop();
			que.push(ele);
			this.question = que.join('');
		}
	}
}

const Num = new Numbers();

function Number(detail){
	
	let number = detail.id;
	let validat = validate.operators(Num.getLast(), number); //validating input for simple arithmetic
	console.log(validat);
	if(number === '=') {
		if(validat === 1){
			document.getElementById('ans').textContent = 'Invalid Syntax!';
		}
		else{
			let answer = Num.getAnswer();
			document.getElementById('ans').textContent = answer;
		}
	}
	else if(number === 'AC'){
		Num.clear();
		document.getElementById('ques').textContent = '';
		document.getElementById('ans').textContent = '0';	
	}
	else{
		if(validat === 1){
			Num.replaceLast(number);
			document.getElementById('ques').textContent = Num.question;
		}
		else if(validat === 0){

		}
		else{
			let que = Num.Value(number);
			document.getElementById('ques').textContent = que;
			console.log(que);
		}
	}
}