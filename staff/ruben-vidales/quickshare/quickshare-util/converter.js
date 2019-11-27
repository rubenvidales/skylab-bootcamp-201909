const converter = {
    stringToSeconds(target) {
        const pieces = target.split(':')
        //Normal path: hh:mm:ss (máx 23:59:59)
        if (pieces.length == 3){
            return (+pieces[0]) * 60 * 60 + (+pieces[1]) * 60 + (+pieces[2])
        //Special path mm:ss 
        }else if (pieces.length === 2){
            return (+pieces[0]) * 60 + (+pieces[1])
        }else{
            return (+pieces[0])
        }
        
    },
    secondsToString(seconds) {
        //return new Date(seconds * 1000).toISOString().substr(11,8)
        let hrs = Math.floor(seconds/3600)
        seconds  %= 3600
        let mins = Math.floor(seconds/60)
        let secs = seconds%60

        hrs = String(hrs).padStart(2,'0')
        mins = String(mins).padStart(2,'0')
        secs = String(secs).padStart(2,'0')

        return (hrs+':'+mins+':'+secs)
    }
}

module.exports = converter