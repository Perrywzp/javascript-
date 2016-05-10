//对象 Object
//javascript对象包含一种原型链的特性，允许对象继承另一个对象的属性。正确的使用它能减少对象初始化时
//消耗的时间和内存

//检索 Retrieval
//如果你尝试检索一个并不存在的成员属性的值，将返回undefined.
//|| 运算符可以用来填充默认值
//尝试从undefined的成员属性中取值将会导致TypeError异常。这时可以通过&&运算符来避免错误
//


//原型 Prototype
//当你创建一个对象时，你可以选择某个对象作为它的原型。javascript提供的实现机制杂乱而复杂，但其实可以简化。
//我们给Object增加一个create方法。这个方法创建一个使用原对象作为其原型的新对象。
if(typeof Object.beget !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}