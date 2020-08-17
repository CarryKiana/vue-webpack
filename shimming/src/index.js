// import {
//     file,
//     parse
// } from './globals.js';
// require('./globals.js')
require("exports-loader?file,parse=helpers.parse!./globals.js");

function component() {
    var element = document.createElement('div')
    console.log(file)
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    this.alert('Hmmm, this probably isn`t a great idea...');
    return element;
}
document.body.appendChild(component());