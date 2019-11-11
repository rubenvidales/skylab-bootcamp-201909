// console.log(process.argv)

    const numbers =  process.argv
    let add = 0
    for (let i=2; i<numbers.length; i++) {
        add += Number(numbers[i])
    }
    console.log(add)
