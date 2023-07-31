export default (...args) =>  {
    let classNames = '';
    for (let arg of args) {
        if (typeof arg === 'string') {
            classNames += `${arg} `;
        }

        if (typeof arg === 'object') {
            Object.keys(arg).forEach((x) => {
               if (arg[x]) {
                classNames+= `${x} `;
               }
            });

        }
    }


    return classNames.trim();
}


