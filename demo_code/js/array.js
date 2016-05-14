// 数组字面量 Array Literals
var empty = [];
var numbers = [
    'zero','one','two','three','four',
    'five','six','seven','eight','nine'
];
var numbers_object = {
    '0':'zero',
    '1':'one',
    '2':'two',
    '3':'three',
    '4':'four'
};


var misc = [
    'string',98.6,true,false,null,undefined,['nested','array'],{object:true},NaN,Infinity
]
//misc.length //10

//长度Length 
var myArray = [];
// myArray.length;//10
// 如果你用大于或等于当前length的数字作为下标来存储一个元素，那么length值会被增大以容纳新元素，不会发生数组越界错误。
// length属性的值是这个数组的最大整数属性加上1。它不一定等于数组里的属性的个数：
// myArray[100000] = true;
// myArray.length //100001
// 你可以直接设置length 的值。设置更大的length不会给数组分配更多的空间。而把length设小将导致所有下标大于等于新length的属性
// 被删除
numbers.length = 3;
//numbers是［'zero','one','two']
numbers[numbers.length] = 'si';
//numbers是 ['zero','one','two','si']
//有时用push方法可以更方便地完成同样的事情：
numbers.push('go');
//numbers是 ['zero','one','two','si','go']

//删除 delete 
// delete numbers[2];
//numbers是 ['zero','one',undefined,'si','go']
//这样做会在数组中留下一个空洞
//用数组中的splice方法 第一个参数是数组中的一个序号，第2个参数是要删除的元素个数。
numbers.splice(2,1);
//numbers是 ['zero','one','si','go']
//因为被删除属性后面的每个属性都必须被移除，并且以一个新的键值重新插入，这对与大型数组来说可能会效率不高

//枚举 Enumeration
//因为javascript的数组其实就是对象，所以for in语句可以用来遍历一个数组的所有属性。
//遗憾的是，for in 无法保证属性的顺序，而大多数要遍历数组的场合都期望按照阿拉伯数字顺序来产生元素。此外，可能从原型链中得到意
//外属性的问题依旧存在。幸运的是，常规的for 语句可以避免这些问题。Javascript的for语句和大多数类C(C-like)语言相似。它被3个
//从句控制--第1个初始化循环，第2个执行条件检测，第3个执行增量元算：
var i;
for(i = 0; i < myArray.length ; i += 1){
    document.writeln(myArray[i]);
}

//容易混淆的地方 Confusion
//区别使用数组还是对象的规则：当属性名是小而连续的整数时，你应该用数组。否则，使用对象。
//javascript没有一个好的机制来区别数组和对象。我们可以通过定义自己的is_array函数来弥补这个缺陷：
var is_array = function(value){
    return value && 
        typeof value === 'object' &&
        value.constructor === Array;
};
//遗憾的是，它在识别从不同的窗口（window）或帧里构造的数组时会失败。有一个更好的方式去判断一个对象是否为数组：
var is_array = function(value){
    return Object.prototype.toString.apply(value) === '[Object Array]';
};

//方法 Methods
//在第三章里，我们看到Object.prototype是可以被扩充的。同样Array.prototype也可以被扩充。
//举例：假设我们想要给array增加一个方法，它允许我们对数组进行计算：
Array.method('reduce',function(f,value){
    var i;
    for (i = 0 ; i < this.length ; i += 1){
        value = f(this[i],value);
    }
    return value;
});
//在这个例子中我们定义了一个reduce方法，它接受一个函数和一个初始值作为参数。它遍历这个数组，以当前和该初始值为参数调用这个
//函数，并且计算出一个新值。当完成时，它返回这个值。如果我们传入一个把两个数字相加的函数，它会计算出相加之和。如果我们传入把
//两个数字相乘的函数，它会计算两者的乘积：
var data = [4,8,15,16,23,42];
var add = function(a,b){
    return a + b;
};
var mult = function(a,b){
    return a * b;
};
var sum = data.reduce(add,0);

var product = data.reduce(mult,1);

data.total = function(){
    return this.reduce(add,0);
};
total = data.total(); //total是108

// 指定元素的初始值 Dimensions
 Array.dim = function(dimension,initial){
    var a = [] ,i ;
    for(i = 0;i < dimension; i += 1){
        a[i] = initial;
    }
    return a;
 };
 //创建一个包含10个0的数组
 var myArray = Array.dim(10,0);

 var matrix = [[0,1,2],[3,4,5],[6,7,8]];
    document.writeln(matrix[2][1]+'<br/>');
//为了创建一个二维数组或者说数组的数组，你必须自己去创建那个第二维的数组：
// for(i = 0 ; i < n ; i += 1){
//     my_array[i] = [];
// }
//注意Array.dim[n,[]]在这里不能工作。
//如果使用它，每个元素都指向同一个数组的应用，那后果不堪设想。
Array.matrix = function(m,n,initial){
    var a, i, j, mat = [];
    for(i = 0 ; i < m ; i += 1){
        a = [];
        for(j = 0 ; j < n ; j += 1){
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

//构造一个用 0 填充的4*4矩阵。
var myMatrix = Array.matrix(4,4,0);
document.writeln(myMatrix[3][3]+'<br/>');

//用来构造一个单位矩阵的方法。
Array.identity = function(n){
    var i , mat = Array.matrix(n,n,0);
    for(i = 0 ; i < n ; i += 1){
        mat[i][i] = 1;
    }
    return mat;
};
myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3]+'<br/>');
