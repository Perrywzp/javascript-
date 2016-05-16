//伪类 Pseudoclassical
// this.prototype = {constructor:this};

//当采用构造器函数调用模式，即用new前缀去调用一个函数时，函数执行的方式会被修改。
//如果new运算符是一个方法而不是一个运算符，它可能会像这样执行:
Function.method('new', function() {
    //创建一个新对象,它继承自构造器函数的原型对象。
    var that = Object.create(this.prototype);
    //调用构造器函数，绑定 -this-到新对象上。
    var other = this.apply(that, arguments);
    //如果它的返回值不是一个对象，就返回该新对象。
    return (typeof other === 'object' && other) || that;
});

//我们可以定义一个构造器并扩充它的原型：
var Mammal = function(name) {
    this.name = name;
};
Mammal.prototype.get_name = function() {
    return this.name;
};
Mamal.prototype.says = function() {
    return this.saying || '';
};

//现在，我们可以构造一个实例:
var myMammel = new Mammel('Herb the Mammel');
var name = myMammel.get_name();

//我们可以构造另一个伪类来继承Mammel,
//这是通过定义它的constructor函数并替换它的prototype为一个Mammel的实例来实现的:
 
var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
    //替换Cat.prototype 为一个新的Mammal实例。
    Cat.prototype = new Mammel();
    //扩充新原型对象，增加purr和get_name方法。
    Cat.prototype.purr = function(n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    Cat.prototype.get_name = function() {
        return this.says() + ' ' + this.name + ' ' + this.says();
    };

    var myCat = new Cat('Henrietta');
    var says = myCat.says(); //'meow'
    var purr = myCat.purr(5); //'r-r-r-r-r'
    var name = myCat.get_name(); //'meow Henrietta meow'
};

//伪类模式本意是想向面向对象靠拢，但它看起来格格不入。
//我们可以隐藏一些丑陋的细节，通过使用method方法来定义一个inherits方法实现：
 
Function.method('inherits', function(Parent) {

    this.prototype = new Parent();
    return this;
});

var Cat = function(name){
    this.name = name;
    this.saying = 'meow';
}
.inherits(Mammal)
.method('purr',function(n){
    var i , s= '';
    for(i = 0; i < n ; i += 1){
        if(s){
            s += '-';
        }
        s += 'r';
    }
    return s;
})
.method('get_name',function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
});

//对象说明符
// var myObject = maker(f,l,m,c,s);

// var myObject = maker({
//     first:f,
//     middle:m,
//     last:l,
//     state:s,
//     city:c
// });
//原型
var myObject = {
    name : 'Herb the Mammal',
    get_name : function(){
        return this.name;
    },
    says:function(){
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n){
    var i , s = '';
    for(i = 0 ; i < n ; i += 1){
        if(s){
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function(){
    return this.says + ' ' + this.name + ' ' + this.says;
};

var block = function(){
    var oldScope = scope;
    scope = Object.create(scope);

    advance('{');
    parse(scope);
    advance('}');
    scope = oldScope;
};

//函数化 Functional
//这是一个函数构造起的伪代码模版
// var constructor = function(spec,my){
//     var that,其他的私有实例变量;
//     my = my || {};
//     把共享的变量和函数添加到my中
//     that = 一个新对象
//     添加给that的特权方法
//     return that;
// };


// my.member = value;
// var methodical = function(){
//     // ...
// };
// that.methodical = methodical;

var mammal = function(spec){
    var that = {};
    that.get_name = function(){
        return spec.name;
    };
    that.says = function(){
        return spec.saying || '';
    };
    return that;
};
var myMammal = mammal({name : 'Herb'});

var cat = function(spec){
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function(n){
        var i , s = '';
        for (i = 0 ; i < n ; i += 1){
            if(s){
                s += '-';
            }
        }
        return s;
    };
    that.get_name = function(){
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};
var myCat = cat({ name: 'Henrietta' });

Object.method('superior',function(name){
    var that = this;
        method = that[name];
    return function(){
        return method.apply(that,arguments);
    };
});

var coolcat = function(spec){
    var that = cat(spec);
        super_get_name = that.superior('get_name');
    that.get_name = function(n){
        return 'like' + super_get_name() + 'baby';
    };
    return that;
};
var myCoolCat = coolcat({name:'Bix'});
var name = myCoolCat.get_name();

//组件 Parts
var eventuality = function(that){
    var registry = {};
    that.fire = function (event){
        var array,
            func,handler,
            i,
            type = typeof event === 'string' ? event : event.type;
        if(registry.hasOwnProperty(type)){
            array = registry[type];
            for (i = 0 ; i < array.length ; i += 1){
                handler = array[i];
                func = handler.method;
                if(typeof func === 'string'){
                    func = this[func];
                }
                func.apply(this,handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function(type,method,parameters){
        var handler = {
            method:method,
            parameters:parameters
        };
        if(registry.hasOwnProperty(type)){
            registry[type].push(handler);
        }else{
            registry[type] = [handler];
        }
        return this;
    };
    return that;
 };





