const args = process.argv.slice (2)
sum = args.reduce((sum, num)=>parseInt(sum)+parseInt(num)/* sum+=parseInt(num),0 */)

console.log(sum)