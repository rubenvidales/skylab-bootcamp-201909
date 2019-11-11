let add = 0;
for (let i = 2; i<process.argv.length; i++) {
    add += Number(process.argv[i])
}

console.log(add)