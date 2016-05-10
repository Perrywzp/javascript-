#第四章 函数

**函数**,他是javascript的基础模块单元。一般来说，所谓编程，就是将一组需求分解成一组函数与数据结构的技能


***调用 Invocation***

***方法调用模式 the Method Invocation Pattern***
  当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this被绑定到该对象。
```
var myObject = {
    value:0,
    increment:function(inc){
        this.value += typeof inc === 'number' ? inc : 1;
    } 
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment(2);
document.writeln(myObject.value);

```
***函数调用模式 the Function Invocation Pattern***
当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的：
这个设计错误的后果就是方法不能利用内部函数来帮助它工作，因为内部函数的this绑定了错误的值，所以不能共享
该方法对对象的访问权。幸运的是，有一个很容易的解决方案：如果该方法定义一个变量并给它赋值为this,那么内部
函数就可以通过那个变量访问到this。按照约定，我把那个变量命名为that:
  给myObject增加一个double方法
```
myObject.double = function(){
    var that = this; //解决方法
    var helper = function(){
        that.value = add(that.value,that.value);
    };
    helper();
};
myObject.double();
document.writeln(myObject.value);
```

***构造器调用模式 the Constructor Invocation Pattern***

***方法调用模式***

递归 －－ 递归函数就是会直接或间接地调用自身的一种函数
汉诺塔 ： 塔上有3根柱子和一套直径各不相同的空心圆盘。开始时源柱子上的所有圆盘都按照从小到大的顺序堆叠。目标是通过每次移动一个圆盘到另一根柱子，最终把一堆圆盘移动到目标上，过程中不允许把较大的圆盘放置在较小的圆盘之上。这个问题有一个寻常解：
```javascript
var hanoi = function(disc,src,aux,dst){
  if(disc > 0 ){
    hanoi(disc - 1 , src, dst, aux);
    document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
}
```
圆盘数量为3时它返回这样的解法：
move disc 1 from Src to Dst
move disc 2 from Src to Aux
move disc 1 from Dst to Aux
move disc 3 from Src to Dst
move disc 1 from Aux to Src
move disc 2 from Aux to Dst
move disc 1 from Src to Dst

var walk_the_DOM = function walk(node,func){
    
}
