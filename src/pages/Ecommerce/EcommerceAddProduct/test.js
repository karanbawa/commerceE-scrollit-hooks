const optionsRef = [
  ["large", "small", "medium"],
  ["black", "white", "green", "yellow"],
  ["luxury", "pricy", "cheap"], ['new','old']
]

function Combine(options, result=[]){
    if(!result.length){
        return Combine(options,options.pop())
    } else if (!options.length){
        return result
    }else {
        const as = []
        for(let option of options.pop()){
            for(let oldOptions of result){
                as.push(`${oldOptions} | ${option}`)
            }
        }
        return Combine(options, as)
    }
}

console.log(Combine(optionsRef))