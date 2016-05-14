var Mammal = function(name){
    this.name = name;
};
Mammal.prototype.get_name = function(){
    return this.name;
};
Mammal.prototype.says = function(){
    return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();

var Cat = function(name){
    this.name = name;
    this.saying = 'meow';
};
Cat.prototype = new Mammal();
Cat.prototype.purr = function(n){
    var i , s = '';
    for(i = 0 ; i < n; i += 1){
        if(s){
            s += '-';
        }
        s += 'r';
    }
    return s;
};
var myCat = new Cat('Henrietta');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();


Function.method('inherits',function(Parent){
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




