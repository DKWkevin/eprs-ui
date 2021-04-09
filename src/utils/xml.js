export const xmlToString = function(eleJson){
  console.log(eleJson)
  let doc=new CreatXmlDoc(eleJson);
  let SetupSerial=(new XMLSerializer()).serializeToString(doc.render());
  let reg = new RegExp('xmlns="http://www.w3.org/1999/xhtml"',"g");
  // 替换转义字符
  let reg1 = new RegExp('<',"g"); // <
  let reg2 = new RegExp('>',"g"); // >
  let reg3 = new RegExp('&',"g"); // &
  let reg4 = new RegExp('&apos;',"g"); // '
  let reg5 = new RegExp('"',"g"); // "
  SetupSerial=SetupSerial.replace(reg,"").replace(reg1, "<").replace(reg2, ">").replace(reg3, "&").replace(reg4, "'").replace(reg5, '"');
 console.log(SetupSerial)
  let blob=new Blob([SetupSerial],{type:'text/xml;charset=utf-8'});
  return blob;
};
function CreatXmlDoc(obj){
  this.tagName=obj.tagName;
  this.properties = obj.properties;
  var children=obj.children.map(function(item){
    if(typeof item =="object")
    {
      item=new CreatXmlDoc(item);
    }
    return item;
  });
  this.children=children;
}
function loadXMLDoc(dname) {
  let xmlDoc=null;
  try {//Internet Explorer
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  } catch(e) {
    try {//Firefox, Mozilla, Opera, etc.
      xmlDoc = document.implementation.createDocument("", "", null);
    } catch(e) {
      alert(e.message);
    }
  }
  return xmlDoc;
}
CreatXmlDoc.prototype.render=function(){
  let xmlDoc = loadXMLDoc();
  var xe1 = xmlDoc.createElement(this.tagName);
  if(this.properties!==undefined){
    for(var p in this.properties){
      xe1.setAttribute(p, this.properties[p]);
    }
  }else{}
  console.log(xe1)
  let children=this.children || [];
  children.forEach(function(child){
    var childEl=(child instanceof CreatXmlDoc)
      ? child.render()
      :xmlDoc.createTextNode(child);
    xe1.appendChild(childEl);
  });
  return xe1;
};
