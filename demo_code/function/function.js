//递归 Recursion

/**
 * 汉诺塔 经典递归算法
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
var hanoi = function(disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst + '<br>');
        hanoi(disc - 1, aux, src, dst);
    }
};

/**
 * 获取文档树节点操作
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};
var getElementsByAttribute = function(att, value) {
    var results = [];
    walk_the_DOM(document.body, function(node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
};
/**
 * 一些语言提供了尾递归（tail recursion 是一种在函数的最后之行递归调用语句的特殊形式的递归）优化。这意味着如果一个
 *如果一个函数返回自身递归调用的结果，那么调用的过程会被替换为一个循环，它可以显著提高速度。遗憾的是，javascript当前
 *并没有提供尾递归优化。深度递归的函数可能会因为堆栈溢出而运行失败。
 */

/**
 * a！计算阶乘数factorial(4)
 * 
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};

//作用域 Scope
//
//作用域控制着变量与参数的可见性及生命周期。（它减少了名称冲突，并且提供了自动内存管理）
//定义在代码块中的变量在代码执行结束后会被释放掉（好事）。
//很多现代语言中都推荐尽可能延迟声明变量。javascript不然，提倡的做法是在函数体的顶部声明函数中可能用到的所有变量。

var foo = function() {
    var a = 3,
        b = 5;

    var bar = function() {
        var b = 7,
            c = 1;
        // 此时，a为3，b为7，c为11.
        a += b + c;
        //此时，a为21，b为7, c 为 11.
    };
    //此时，a为3，b为5，而c还没有定义。
    bar();
    //此时，a 为21 ， b 为 5。
};

//闭包
//作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了this 和 arguments）。
//一个更有趣的情形是内部函数拥有比它的外部函数更长的生命周期。

/**
 * [description]
 * 我们并没把一个函数赋值给myObject。我们是把调用该函数后返回的结果赋值给它。注意最后一行（）；该函数返回
 * 一个包含两个方法的对象，并且这些方法继续享有访问value的特权。
 * 
 * @param  {[type]} )         {                 var value [description]
 * @param  {[type]} getValue: function()    {                                 return value;        }    };}() [description]
 * @return {[type]}           [description]
 */
var myObject = (function() {
    var value = 0;
    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    };
}());


//构建一个名为quo的构造函数。
//它构造出带有get_status方法和status 私有属性的一个对象。
var quo = function(status) {
    return {
        get_status: function() {
            return status;
        }
    };
};
//构造一个quo实例
var myQuo = quo("amazed");
// document.writeln(myQuo.get_status());

var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
// fade(document.body);


//糟糕的例子
//
//构造一个函数，用错误的方式给数组中的节点设置事件处理程序。
//当点击一个节点时，按照预期，应该弹出一个对话框显示节点的序号，
//但它总是会显示节点的数目。
//
//add_the_handlers函数的本意是想传递给每个事件处理器一个唯一值（i）。但它未能达到目的，因为事件处理器函数绑定了变量i本身，
//而不是函数在构造时的变量i的值。

var add_the_handlers = function(nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function(e) {
            alert(i);
        };
    }
};

//结束糟糕的例子
//
//
//构造一个函数，用正确的方式给一个数组的节点设置事件处理程序。
//点击一个节点，将会弹出一个对话框显示节点的序号。
//
//避免在循环中创建函数，它可能只会带来无谓的计算，还会引起混淆，正如上面那个糟糕的例子。我们可以先循环之外创建一个辅助函数，
//让这个辅助函数再返回一个绑定了当前i值的函数，这样就不会导致混淆了。
var add_the_handlers2 = function(nodes) {
    var helper = function(i) {
        return function(e) {
            alert(i);
        };
    };
    var i;
    for (i = 0; i < nodes.legnth; i += 1) {
        nodes[i].onclick = helper(i);
    }
};
