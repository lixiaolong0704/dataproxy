
var str =`
    "url": "https://accounts.google.com/o/oauth2/v2/auth",
    23233rfewfawsdfa//ffffffff
`;

var reg = /(\/\/(.+))|(\/\*([\S\s]*?)\*\/)/g

var a = str.replace(reg, "");


var RE_BLOCKS = new RegExp([
        /\/(\*)[^*]*\*+(?:[^*\/][^*]*\*+)*\//.source,           // $1: multi-line comment
        /\/(\/)[^\n]*$/.source,                                 // $2 single-line comment
        /"(?:[^"\\]*|\\[\S\s])*"|'(?:[^'\\]*|\\[\S\s])*'/.source, // - string, don't care about embedded eols
        /(?:[$\w\)\]]|\+\+|--)\s*\/(?![*\/])/.source,           // - division operator
        /\/(?=[^*\/])[^[/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[/\\]*)*?\/[gim]*/.source
    ].join('|'),                                            // - regex
    'gm'  // note: global+multiline with replace() need test
);

// remove comments, keep other blocks
function stripComments(str) {
    return str.replace(RE_BLOCKS, function (match, mlc, slc) {
        return mlc ? ' ' :         // multiline comment (replace with space)
            slc ? '' :          // single/multiline comment
                match;              // divisor, regex, or string, return as-is
    });
}
console.log(stripComments(str));