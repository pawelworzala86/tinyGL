import { minify } from "terser";
import fs from "fs";
import path from "path";
//import 'dotenv/config'

let _module = []

function bundle(code,dir){
  code = code.replace(/^import .*/gm,match=>{
    console.log('import...',match)
    let src
    let kindSrc = 'array'
    let def = false
    if(match.indexOf('{')>-1){
      src = match.split('{')[1].split('}')[0].split(',').map(e=>e.trim())
    }else{
      if(match.indexOf( 'as ')>-1){
        src = match.split(' as ')[1].split(' ')[1]
      }else{
        src = match.split(' ')[1]
        def = true
      }
      kindSrc = 'target'
    }
    console.log('src...',src)
    const file = match.split('\'')[1]
    console.log('file...',file)
    const fpath = path.resolve(dir+'/'+file)
    console.log('fpath...',fpath)

    let drr = path.dirname(fpath)

    const bdl = bundle('\n;(function(){\n_module["'+fpath+'"] = {}\n'+fs.readFileSync(fpath).toString()+'\n})();\n',drr)
    _module[fpath]=bdl

    //_module=_module.map(_mod=>{
    //  _mod.data = bundle('\n;(function(){\n'+_mod.data+'\n})();\n',drr)
    //  return _mod
    //})

    if(def){
      return 'const '+src+' = _module["'+fpath+'"].__def'
    }else{
      if(kindSrc == 'array'){
        return 'const {'+src.join(',')+'} = _module["'+fpath+'"]'
      }else{
        return 'const '+src+' = _module["'+fpath+'"]'
      }
    }
  })
  return code
}

async function run() {
  let code = fs.readFileSync("src/app.js", "utf8").toString();

  //let keys = []
  let codeB = ''
  code = bundle(code,'src')
  console.log(Object.keys(_module))
  for(const key of Object.keys(_module)){
    //const key=_mod.fpath
    //if(keys.indexOf(key)>-1){
    //  continue
    //}
    //keys.push(key)
    let fcode = _module[key]//.data
    fcode = fcode.replace(/export async function (.*)\(/gm,'_module["'+key+'"].$1=$1\nasync function $1(')
    fcode = fcode.replace(/export function (.*)\(/gm,'_module["'+key+'"].$1=$1\nfunction $1(')
    fcode = fcode.replace(/export class (.*)\{/gm,'_module["'+key+'"].$1=$1\nclass $1{')
    fcode = fcode.replace(/export const ([a-zA-Z0-9\_]+)(.*)/gm,'const $1$2\n_module["'+key+'"].$1=$1\n')
    fcode = fcode.replace(/export default ([a-zA-Z0-9\_]+)(.*)/gm,'$2\n_module["'+key+'"].__def=$1\n')
    codeB+=''+fcode+'\n'//+code
  }
  code = codeB+'\n\n'+code
  code = 'const _module = {}\n\n'+code

  code = code.replace('const host = \'{{SERVER_URL}}\'', 'const host = \''+process.env.SERVER_URL+'\'')

  fs.writeFileSync("dist/bundle.js", code, "utf8");

  /*let funcNames = []
  let index = 1
  code = code.replace(/(\ \ [a-zA-Z0-9\_]+\()/gm,match=>{
    const name = match.split('(')[0].trim()
    console.log(name)
    if(!['constructor','if','for','while'].includes(name)){
      funcNames[name] = 'a'+(index++)
    }
    return match
  })
  Object.keys(funcNames).map(key=>{
    const name = funcNames[key]
    code = code.replace(new RegExp('\\b'+key+'\\(','gm'),name+'(')
  })*/

  const result = await minify(code, {
    compress: true,
    mangle: {
      toplevel: true,
      properties: {
        //regex: /^[a-zA-Z_]/,
        keep_quoted: true,
      }
    },
    keep_classnames: false,
    keep_fnames: false,
    ecma: 2020,
  });

  //fs.writeFileSync("dist/app.test.min.js", result.code, "utf8");

  code = result.code
  let idx = 0
  let paths = {}
  code = code.replace(/\"C\:[a-zA-Z0-9\\\/]+\.js\"/gm,match=>{
    if(paths[match]==undefined){
      paths[match] = (idx++)
    }
    return paths[match]
  })

  code = code.replace(/_module/gm,'_m')
  

  fs.writeFileSync("dist/app.min.js", code, "utf8");
  console.log("Plik został zminifikowany!");
}

run();
