const [,,...nums] = process.argv
let result = 0
nums.forEach(num => {
    result += Number(num)
});

console.log(result)