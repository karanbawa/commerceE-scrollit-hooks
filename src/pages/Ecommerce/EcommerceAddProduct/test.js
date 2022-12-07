const options = [
  ["large", "small", "medium"],
  ["black", "white", "green", "yellow"],
  ["luxury", "pricy", "cheap"],
]

const combinations = []

function combine(array1, array2){
    const as = []
    for (let i of array1){
        for(let j of array2){
            as.push([i,j])
        }
    }
    return as
}