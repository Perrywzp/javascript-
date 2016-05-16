继承
======
###伪类 Pseudoclasscal

>当一个函数对象呗创建时，Function构造器产生的函数对象会运行类似这样的一些代码：
```javascript
	this.prototype = {constructor:this};
```

>新函数对象被赋予一个prototype属性，它的值是一个包含constructor属性且属性值为该新函数的对象。这个prototype对象时存放继承特征的地方。因为javascript语言没有提供一种方法去确定哪个函数是打算用来做构造器的，所以每个函数都会得到一个prototype对象。constructor属性没什么用，重要的是prototype对象。

>当采用构造器函数调用模式，即用new前缀去调用一个函数时，函数执行的方式会被修改。如果new运算符是一个方法而不是一个运算符，它可能会像这样执行:
```javascript
	Function.method('new',function(){
		//创建一个新对象,它继承自构造器函数的原型对象。
		var that = Object.create(this.prototype);
		//调用构造器函数，绑定 -this-到新对象上。
		var other = this.apply(that,arguments);
		//如果它的返回值不是一个对象，就返回该新对象。
		return (typeof other === 'object' && other) || that;
	});
```
>我们可以定义一个构造器并扩充它的原型：
```javascript
	var Mammal = function(name){
		this.name = name;
	};
	Mammal.prototype.get_name = function(){
		return this.name;
	};
	Mamal.prototype.says = function(){
		return this.saying || '';
	};
```
>现在，我们可以构造一个实例:
```javascript
var myMammel = new Mammel('Herb the Mammel');
var name = myMammel.get_name();
```
>我们可以构造另一个伪类来继承Mammel,这是通过定义它的constructor函数并替换它的prototype为一个Mammel的实例来实现的:
```javascript
	var Cat = function(name){
		this.name = name;
		this.saying = 'meow';
		//替换Cat.prototype 为一个新的Mammal实例。
		Cat.prototype = new Mammel();
		//扩充新原型对象，增加purr和get_name方法。
		Cat.prototype.purr = function(n){
			var i,s= '';
			for(i = 0 ; i < n ; i += 1){
				if(s){
					s + = '-';
				}
				s += 'r';
			}
			return s;
		}
		Cat.prototype.get_name = function(){
			return this.says() + ' ' + this.name + ' ' + this.says();
		}

		var myCat = new Cat('Henrietta');
		var says = myCat.says(); //'meow'
		var purr = myCat.purr(5); //'r-r-r-r-r'
		var name = myCat.get_name(); //'meow Henrietta meow'
	};
```
>伪类模式本意是想向面向对象靠拢，但它看起来格格不入。我们可以隐藏一些丑陋的细节，通过使用method方法来定义一个inherits方法实现：
```javascript
	Function.method('inherits',function(Parent){
		this.prototype = new Parent();
		return this;
	});
```
>我们的inherits和method方法都返回this,这样允许我们可以采用级联的形式编程。现在可以只用一行语句构造我们的Cat对象。
```javascript
	var Cat = function(name){
		this.name = name;
		this.saying = 'meow';
	}
	.inherits(Mammel)
	.method('purr',function(n){
		var i,s = '';
		for(i = 0 ; i < n ; i += 1){
			if (s){
				s += '-';
			}
			s += 'r';
		}
		return s;
	})
	.method('get_name',function(){
		return this.says() + ' ' + this.name + ' ' + this.says();
	});
```

###对象说明符 Object Specifiers
>有时候，构造器要接受一大串参数。这可能令人烦恼，因为要记住参数的顺序非常困难。在这种情况下，如果我们在编写构造器时让它接受一个简单的对象说明符，可能会更加友好。那个对象包含了将要构建的对象规格说明。所以，与其这些写：
```javascript
	var myObject = maker(f,l,m,c,s);
```
不如这么写：
```javascript
	var myObject = maker({
	 	first:f,
	 	middle:m,
	 	last:1,
	 	state:s,
	 	city:c
 	});
```

###原型 Prototype
>在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承相比基于类的继承在概念上更为简单：一个新对象可以继承旧对象的属性。你通过构造一个有用的对象开始，接着可以构造更多和那个对象类似的对象。（**这样可以完全避免把一个应用拆解成一系列嵌套抽象的分类过程。**）

>让我们先用对象字面量去构造一个有用的对象：
```javascript
	var myMammal = {
		name : 'Herb the Mammel',
		get_name:function(){
			return this.name;
		},
		says:function(){
			return this.saying || '';
		}
	};
```