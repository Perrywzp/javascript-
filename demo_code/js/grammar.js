//建议避免使用/**/注释，而用//注释代替它（在有正则代码的情况下，使用块注释是会出现问题的）

//语句 Statements
//for in语句 会枚举一个对象的所有属性名（或键名）
//通常你需要检测object.hasOwnProperty(variable)来确定这个属性名是该对象的成员，还是来自原型链。
// for(myvar in obj){
// 	if(obj.hasOwnProperty(myvar)){
// 		...
// 	}
// }
// 
// 表达式 Expressions
// &&
// 如果第1个运算数的值为假 && 产生它的第一个运算符的值，否则产生第2个运算符的值。
// ||
// 如果第1个运算数的值为真，那么运算符||产生第1个运算数的值，否则产生第2个运算数的值。