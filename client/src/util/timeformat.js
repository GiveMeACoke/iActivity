export default (time) => {
        let YYYY = time.getFullYear()
        let MM = time.getMonth()+1
        let DD = time.getDate()
        DD = DD<10 ? '0' + DD : DD
        let h = time.getHours()
        h = h<10 ? '0' + h : h
        let m = time.getMinutes()
        m = m<10 ? '0' + m : m
        let s = time.getSeconds()
        s = s<10 ? '0' + s : s
        return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`
    }