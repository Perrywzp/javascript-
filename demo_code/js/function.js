//扩展类型的功能 Augmenting Types
//function.prototype 增加方法来使得该方法对所有函数可用：

Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};
//integet Number扩展 根据数字的正负判断是使用Math.ceiling还是Math.floor。
Number.method('integet', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
// document.writeln((-10 / 3).integet());
// document.writeln('<br>');

//javascript缺少一个移除字符串首位空白的方法。自己增加 trim
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});
// document.writeln('"' + "    neat    ".trim() + '"');

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
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i);
    }
};

// var lis = document.getElementsByTagName("li");
// add_the_handlers2(lis);



//函数使得不连续事件的处理变得更容易。例如，假定有这么一个序列，由用户交互行为触发，向服务器发送请求，最终显示服务器的响应。最
//自然的写法可能会是这样的：
//request = prepare_the_request();
//response = send_request_synchronously(request);
//display(response);

//这种方式的问题在于，网络上的同步请求会导致客户端进入假死状态。如果网络传输或服务器很慢，响应会慢到让人不可接受。
//更好的方式是方式是发起异步请求，提供一个当服务器的响应到达时随即触发的回调函数。异步函数立即返回，这样客户端就不会被阻塞。
//request = prepare_the_request();
//send_request_asynchronously(request,function(response){
//  display(response);
//});




//模块Module
//我们可以使用函数和闭包来构造模块。，模块是一个提供接口却隐藏状态与实现的函数或对象。通过使用函数产生模块，我们几乎可以
//完全摒弃全局变量的使用，从而缓解这个javascript的最为糟糕的特性之一所带来的影响。

//举例来说，假定我门想要给String增加一个deentityify方法。它的任务是寻找字符串中的HTML字符实体并把它们替换为对应的字符。
//这就需要在一个对象中保存字符实体的名字和它们对应的字符。但我们该在哪里保存这个对象呢？我们可以把它放到一个全局变量中，但全
//局变量是魔鬼。我们可以把它定义在该函数的内部，但是那会带来运行时的损耗，因为每次执行该函数的时候该字面量都会被求值一次。理
//想的方式是把它放入一个闭包，而且也许还能提供一个增加更多字符实体的扩展方法：

String.method('deentityify', function() {
    //字符实体表。它映射字符实体的名字到对应的字符。
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    //返回deentityify方法

    return function() {

        //这才是deentityify方法。它调用字符串的replace方法，
        //查找'&'开头和';'结束的子字符串。如果这些字符可以在字符实体表中找到，
        //那么就将该字符实体替换为映射表中的值。它用到了一个正则表达式
        return this.replace(/&([^&;]+);/g,
            function(a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());
//请注意最后一行。我们用()运算法立刻调用我们刚刚构造出来的函数。这个调用所创建并返回的函数才是deentityify方法。
document.writeln('&lt;&quot;&gt;'.deentityify());
//模块模式利用了函数作用域和闭包来创建被绑定对象与私有成员的关联，在这个例子中，只有deentityify方法有权访问字符
//实体表这个数据对象。
//
//模块模式的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数
//或者把它们保存到一个可访问到的地方。
//
//使用模块模式就可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。对于应用程序的封装，或者构造其他单例对象，
//模块模式非常有效。
//
//模块模式也可以用来产生安全的对象。假定我们想要构造一个用来生产生序列号的对象：
var serial_maker = function() {
    //返回一个用来产生唯一字符串的对象.
    //唯一字符串由两个部分组成:前缀+序列号.
    //该对象包含一个设置前缀的方法,一个设置序列号的方法.
    //和一个产生唯一字符串的gensym方法.
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function(p) {
            prefix = String(p);
        },
        set_seq: function(s) {
            seq = s;
        },
        gensym: function() {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    }
};
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
console.log("+++++++++++++++++++++\n");
console.log(unique + "\n");
console.log("+++++++++++++++++++++\n");
//seqer包含的方法都没有用到this或thar,因此没有办法损害seqer.除非调用对应的方法,否则没法改变prefix 或 seq的值
//seqer对象是可变的,所以它的方法可能会被替换掉,但替换后的方法依然不能访问私有成员.seqer就是一组函数的集合,而且那些
//函数被授予特权,拥有使用或修改私有状态的能力.
//如果我们把seqer.gensym作为一个值传递给第三方函数,那个函数能 用它产生唯一字符串,但却不能通过它来改变prefix 或seq
//的值.

//级联 Cascade
//有一些方法没有返回值.例如,一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子.
//如果我们让这些方法返回this而不是undefined,就可以启用级联.在一个级联中,我们可以单独单独一条语句
//中依次掉用一个对象的很多方法。一个启用级联的ajax类库可能允许我们以这样的形式去编码：
// getElement('myBoxDiv')
//     .move(350,150)
//     .width(100)
//     .height(100)
//     .color('red')
//     .border('10px outset')
//     .padding('4px')
//     .appendText("please stand by")
//     .on('mousedown',function(m){
//         this.startDrag(m,this.getNinth(m));
//     })
//     .on('mousemove','drag')
//     .on('mouseup','stopDrag')
//     .later(2000,function(){
//         this
//             .color('yellow')
//             .setHTML("what hath God wraught?")
//             .slide(400,40,200,200);
//     })
//     .tip('This box is resizeable');
//     
//在这个例子中，getElement函数产生一个对应于id = "myBoxDiv" 的DOM元素且给其注入了其他功能的对象。该方法允许我们移动元素，
//修改它的尺寸和样式，并添加行为。这些方法每一个都返回该对象，所以每次调用返回的结果可以被下一次调用所用。
//
//级联技术可以产生出极富表现力的接口。它也能给那波构造“全能”接口的热潮降降温，一个接口没必要一次做太多事情。
//          

//柯里化 Curry
//函数也是值，从而我们可以用有趣的方式去操作函数值。柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。
var add1 = add.curry(1),
    document.writeln(add1(6));
//add1 是把1传递给add函数的curry方法后创建的一个函数。add1函数把传递给它的参数的值加1。javascript 并没有curry方法，但我们可以给
//Function.property扩展此功能：
Function.method('curry', function() {
    var args = arguments,
        that = this;
    return function() {
        return that.apply(null, args.concat(arguments));
    };
});
//curyy方法通过创建一个保存着原始函数和要被套用的参数的闭包来工作。它返回另一个函数，该函数被调用时，会返回调用原始函数的结果，
//并传递调用curry时的参数加上当前的参数。它使用Array的concat方法连接两个参数数组。
//糟糕的是，就像我们先前看到的那样，arguments 数组并非一个真正的数组，所以它并没有concat方法。要避开这个问题，我们必须在两个
//arguments数组上都应用数组的slice方法。这样产生出拥有concat方法的常规数组。
Function.method('curry', function() {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments);
    that = this;
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});


//记忆 Memoization
//函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化被称为记忆（ memoization）。javascript 的对象和数组
//要实现这种优化是非常方便的。
//比如说，我们想要一个递归函数来计算Fibonacci数列。一个Fibonacci数字是之前两个Fibonacci数字之和。最前面的两个数字之和。最前面
//两个数字是0和1。
var fibonacci = function(n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for(var i = 0 ; i <= 10 ; i += 1){
    document.writeln('//' + i + ': ' + fibonacci(i));
}

//这样是可以工作的，但它做了很多无谓的工作。fibonacci函数被调用了453次。我们调用了11次，而它自身调用了442次去计算可能已被刚计算
//过的值。如果我们让该函数具备记忆功能，就可以显著地减少运算量。

//我们在一个名为memo的数组里保存我们的存储结果，存储结果可以隐藏在闭包中。当函数被调用时，这个函数首先检查结果是否已存在，如果已经存在
//就立即返回这个结果。

var fibonacci = function(){
    var memo = [0,1];
    var fib = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
//这个函数返回同样的结果，但它只被调用了29次。我们调用了它11次，它调用了自己18次去取得之前存储的结果。

//我们可以把这种技术推而广之，编写一个函数来帮助我们构造带记忆功能的函数。memoizer函数取得一个初始的memo数组。
//
var memoizer = function(memo,formula){
    var recur = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = formula (recur,n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};
//现在我们可以使用memoizer函数来定义fibonacci函数，提供其初始的memo数组和formula函数：
var fibonacci = memoizer([0,1],function(recur,n){
    return recur(n - 1) + recur(n - 2);
});

//通过设计这种产生另一函数的函数，极大地减少了我们的工作量。例如，要产生一个可记忆的阶乘函数，我们只需提供基本的阶乘公式即可：
var factorial = memoizer([1,1],function(recur,n){
    return n * recur(n - 1);
});