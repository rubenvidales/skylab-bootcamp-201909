let cont = 0
for (let i = 2; i < process.argv.length; i++) {
    cont += Number(process.argv[i])
}
console.log(cont)