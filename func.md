#第四章 函数

**函数**,他是javascript的基础模块单元。一般来说，所谓编程，就是将一组需求分解成一组函数与数据结构的技能

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