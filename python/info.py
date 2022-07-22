#!/usr/bin/env python3
from collections.abc import Iterable
from functools import reduce
import os
import json
import math
import random
import types
import itertools
from enum import Enum, unique

'''
三个字符串可作为多行注释，可以是单引号或者双引号

这些都是linux环境的解释头

#!/usr/bin/python3 -- 使用python解释

#!/usr/local/python3/bin/python3.4 -- 使用指定路径的python解释

#!/usr/bin/env python3 -- 使用系统环境变量的python解释

'''

'''
------提示------

python是动态类型，强类型语言
动态类型是因为python不需要用指定类型去定义变量
强类型是因为python更偏向于不在运算时有隐式的转换变量类型

python是区分大小写的，而且布尔值为True，False，它类型是Number类型

python中的None和js的null是一个意思，表示啥都没存，''首先是字符串，再是空字符串

python中的 ** 和 * 类似于js中扩展运算符 ... ，可以将多个参数打包在一个变量中，也可以解包该变量为多个参数对应到方法的多个参数

python中类的实例方法第一个参数必须要是self,如果不加self就类似于是静态方法

python中object, dict获取不存在的key直接报错,不会返回None -- 使用 key in dict 先判断是否存在，再去调用，或者用try/except包裹使用，或者使用get方法

python六个标准的数据类型：
Number（数字）
    int、float、bool、complex（复数）
    不可变，理解为js中的简单类型, Number
String（字符串）
    str
    不可变，理解为js中的简单类型, String
Tuple（元组）
    tuple
    元组元素不包含可变对象，那么这个元组也是不可变的
    元组元素包含可变对象，那么这个元组将变成是可变的
    不可变，理解为js中的复杂类型，被冻结的数组，Freeze Array
List（列表）
    list
    可变，理解为js中的复杂类型，Array
Set（集合）
    set
    可变，理解为js中的复杂类型，Set
Dictionary（字典）
    dict
    可变，理解为js中的复杂类型，Map

常用库：
json -- json操作
sys -- 操作解释器
os -- 操作系统
glob -- glob.glob('*.py')可以生成文件名列表
re -- 正则表达式工具
math -- 数学工具
time / datetime -- 时间日期工具
functools -- 函数工具

不爽的地方:
字典不能使用‘.’来获取key的值，要转换为object或者json才可以用‘.’
没有switch 逻辑语句，要用字典来替代switch
因为由缩进控制代码逻辑，导致代码的风格会出现很多多余的换行

优点:
有些操作方式很优雅，简洁
'''

'''
------输入------
'''
# 输入会导致程序暂停，等待用户输入
# name = input('please enter your name: ')
# print('hello', name)

'''
------输出------
'''
# 普通输出
print('hello world')

# 多串输出
print('hello', 'world')

# 转义输出
print('hello \'demo\' \n')

# 多行输出
print('''var1
var2
var3''')

# 逻辑输出
print(1 + 1)

# 变量输出
var1 = 'T_T'
print(var1)

# 输出字符串两次
print(var1 * 2)

# 输出连接的字符串
print(var1 + 'TEST')

'''
------变量------
'''
# 声明变量并赋值，同名变量赋值不会报错，后面覆盖前面
var1 = 'demo'
print(var1)
# 在函数、class外声明的变量都是全局变量，函数、class内的则是局部变量
# print(locals())  # 返回局部变量字典 此时locals指向的也是全局空间
# print(globals())  # 返回全局变量字典
# 如果需要在函数内部声明全局变量可以使用 global 关键字
# 如果需要在嵌套作用域中修改外层作用域(非全局作用域)可以使用 nonlocal 关键字

# 特殊变量，也就是python内置变量
print(__name__)  # 等于__main__，表示在自身运行，否则表示在被其他模块引用运行
print(__file__)

# 多变量赋值
var2 = var3 = var4 = 1
print(var2, var3, var4)
var2, var3, var4 = 1, 2, 3
print(var2, var3, var4)

# 解构
x, y, z = [1, 2, 3]

# 变量交换
var2, var3 = 1, 2
print(var2, var3)
var2, var3 = var3, var2
print(var2, var3)

# 删除变量
del var1
del var2, var3, var4


'''
------字符串操作------
'''
var1 = 'string'
# 多行字符串
var2 = '''
多行字符串\n
并且识别转义符
'''
# 字符串拆分，注意需要自己在末尾添加空格
var5 = ("select * from test "
        "where type = 1 "
        "order by create time")
var3 = f'{1+2}'
var4 = 1
print(var2)
print(var5)
# 读取字符串
#   获取字符长度
print(len(var1))
#   获取0索引字符，也就是取开头
print(var1[0])
#   获取-1索引字符，也就是取末尾
print(var1[-1])
#   获取2索引到末尾字符串
print(var1[2:])
#   获取开头字符串到3索引
print(var1[:3])
#   获取2索引到3索引字符串，左闭右开，[2, 3)
print(var1[2:3])
#   左边索引大于右边索引，会打印空字符串
print(var1[3:0])

# 字符串引用变量
#   参数输出，%d表示整数，%s表示字符串，%f表示小数，%.Nf这个N表示保留几位小数
print('hello %s %d %.4f' % (var1, 18, 0.12))
#   format()函数法
print('hello {str} {num} {num1}'.format(str=var1, num=18, num1=0.12))
print('hello {0} {1} {2}'.format(var1, 18, 0.12))

# f,r,b,u
#   f-string，格式化字符串，是一个在运行时运算求值的表达式，版本3.6+
print(var3)
#     使用表达式
print(f'{1+2}')
#     使用变量
print(f'{1+2+var4}')
#   r-string，r的作用是原样保存转义字符
print(r'\n')
#   b-string，表示一个bytes对象，因为版本2.x之前str是byte类，版本3.x是unicode类
print(b'123')
#   u-string，unicode格式进行编码，防止使用乱码
print(u'中文')

# 字符串函数
#   返回40位字符长度的字符串，居中显示，两边由*补充
print('string'.center(40, '*'))
#   返回字符串出现个数，后面是开始索引和截至索引
print('string str s'.count('s', 0, len('string str s')))
#   以开头，以结尾
print('string'.startswith('str', 0, len('string')))
print('string'.endswith('ing', 0, len('string')))
#   查找索引
print('string'.find('s', 0, len('string')))
#   是否只包含空白
print('    '.isspace())
#   join一个序列，返回字符串
print(';'.join('%s' % item for item in [1, 2, 3, 'a']))
try:
    ';'.join([1, 2, 3, 'a'])
except Exception:
    print('int need to convert str')
#   长度
print(len('string'))
#   替换s为h，不能超过2次
print('string str s'.replace('s', 'h', 2))
#   以空格为分隔符或者指定字符串分割为列表
print('this is string example'.split())
print('1,2,3'.split(',', 1))  # 并且只分割一次
#   去掉空格
#     去掉左边空格
print('  123  '.lstrip())
#     去掉右边空格
print('  123  '.rstrip())
#     去掉左边空格
print('  123  '.strip())
#   全部大写
print('string'.upper())
#   全部小写
print('string'.lower())
#   首字符大写
print('string'.capitalize())
#   所有单词首字符大写
print('this is string example'.title())

'''
------数字操作------
'''
# 数学函数
list1 = [20, 16, 10, 5]
#   绝对值
print(abs(-10))
#   上入整数
print(math.ceil(4.1))
#   下入整数
print(math.floor(4.9))
#   最大值
print(max(4, 3, 2, 9))
#   最小值
print(min(4, 3, 2, 9))
#   次幂，等同于2**2
print(pow(2, 2))
#   平方根 4**2
print(math.sqrt(4))
#   四舍五入，保留值将保留到离上一位更近的一端
print(round(2.124, 2))
print(round(2.126, 2))
#   随机
#     随机从序列挑一个数
print(random.choice(range(100)))
print(random.choice([1, 2, 3, 5, 9]))
print(random.choice('hxy'))
#     随机浮点数数[0,1)
print(random.random())
#     随机浮点数[左,右]
print(random.uniform(5, 10))
#     随机序列
random.shuffle(list1)
print(list1)

'''
------列表操作------
'''
list0 = ['demo', 1314, 250, 'temp']
list1 = [1, 2, 3, 1]
list2 = [(2, 2), (3, 4), (4, 1), (1, 3)]
list3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 访问列表
print(list0)
#   获取列表长度
print(len(list0))
#   通过索引访问
print(list0[0], list0[-1])
#   通过元素获取索引
print(list0.index(1314))
try:
    print(list0.index('1314'))
except Exception:
    print('not found \'1314\'')
#   判断元素是否在列表中，返回True，false
print('demo' in list0)
#   获取2索引到末尾的列表
print(list0[2:])
#   获取开头到3索引的列表
print(list0[:3])
#   获取2索引到3索引的列表，左闭右开，[2, 3)
print(list0[2:3])
#   左边索引大于右边索引，会打印空列表
print(list0[3:2])
#   先取一个，每两个再取一个
print(list3[::2])
#   前[0,8)个数每两个取一个
print(list3[:8:2])
#   复制列表
print(list3[:])
#   反转列表
print(list3[::-1])

# 操作列表
#   赋值
list0[0] = 'new'
print(list0)
#   删除元素
del list0[0]
print(list0)
#   列表组合，不操作源列表，但是可以重新赋值给list
print(list0 + list1)
#   重复列表
list1 = list1 * 2
print(list1)
#   向末尾插入
list0.append('new')
print(list0)
#   向指定索引左边插入
list0.insert(2, 'new')
print(list0)
#   列表组合，操作源列表
list0.extend([2, 'new'])
print(list0)
#   从末尾删除
list0.pop()
print(list0)
#   删除指定元素
list0.remove('new')
print(list0)
#   排序列表，key是一个函数类型，reverse默认False升序
list1.sort(key=None, reverse=False)
print(list1)
# 指定第二个元素排序
list2.sort(key=lambda ele: ele[1])
print(list2)
#   反转列表
list0.reverse()
print(list0)
#   查找列表最多项，最少项就用min
print(max(set([1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4]),
      key=[1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4].count))
#   拉平二维列表到一维列表
print(list(itertools.chain.from_iterable([[1, 2], [3, 4], [[5], [6]]])))
#   拉平多维列表需要安装more_itertools，使用list(more_itertools.collapse(temp_list))

'''
------元组操作------
'''
# 元组和列表基本一致，但元组值不能二次赋值，相当于只读列表，表示指向不变，不代表元素绝对不变
tupleTemp = (1, 2, 3)
tupleTemp = (1,)  # 注意一个元素不能直接(1)，这会把括号识别为优先级符号

'''
------集合操作------
'''
# 集合不包含重复元素，并且值不能使用可变对象，也就是List，Set，Dictionary，Object
set1 = {1, 2, 3, 1, 2}
set2 = set([1, 2, 3])
frozenset1 = frozenset(range(10))
frozenset2 = frozenset([1, 2, 3])
# 访问集合
print('set1', set1)
print(set2)
print(frozenset1)
print(frozenset2)

# 操作集合
#   添加元素
set1.add(1)
print(set1)
#   更新集合，可以使用集合
set1.update({3, 4})
print(set1)
#   删除
set1.remove(1)  # 不存在，报错
print(set1)
set1.discard(1)  # 不存在，不报错
print(set1)
#   集合运算
set1 = {2, 3, 4}
set2 = {1, 2, 3}
#     取差集，set1包含，而set2不包含的集合 => {4}
print(set1 - set2)
#     取并集，set1和set2的所有元素，但不会有重复 => {1, 2, 3, 4}
print(set1 | set2)
#     取交集，set1和set2共同包含元素的集合 => {2, 3}
print(set1 & set2)
#     未重复集合，set1和set2不同包含的元素集合 => {1, 4}
print(set1 ^ set2)

'''
------字典操作------
'''
# 字典键不能重复，并且key不能使用可变对象，也就是List，Set，Dictionary，Object
# 字典类似于js中的map而不是object
dictionary1 = {'a': 1, 'b': 2, 'c': 3}

# 访问字典
print(dictionary1)
#   字典元素个数
print(len(dictionary1))
#   以key访问，key不存在将报错
print(dictionary1['a'])
#   以get方法访问，key不存在也不会报错
print(dictionary1.get('a'))
#   键列表
print(dictionary1.keys())
#   值列表
print(dictionary1.values())
#   键值列表，列表元素为键值元组
print(dictionary1.items())

# 操作字典
#   赋值
dictionary1['a'] = 2
print(dictionary1)
#   删除
del dictionary1['a']
dictionary1.pop('b')
print(dictionary1)


'''
------object操作------
'''
# object是所有数据类型，值，变量，函数，类，实例等等的基石，也就是万物皆对象
# type是所有类的类型，type是继承object
# type表示类型，object表示东西，class就是我们自定义的一个type，它的实例就是一个object
# object可以使用.获取/操作属性值，也可以使用*attr方法


class MyClass:
    def __init__(self):
        self.demo = 1


my_object = MyClass()
print(my_object.__dict__)
# 赋值
my_object.demo1 = 2
setattr(my_object, 'demo2', 3)
# 获取
print(my_object.demo)
print(getattr(my_object, 'demo1'))
print(hasattr(my_object, 'demo2'))
print(my_object.__dict__)
# 删除
delattr(my_object, 'demo1')
del my_object.demo2
print(my_object.__dict__)

'''
------判断类型操作------
'''


class MyDemoClass:
    pass


def fn():
    pass


# type，一般判断对象类型
print(type("asd") == str)
print(type(1) == int)
print(type(fn) == types.FunctionType)
print(type(fn) == types.BuiltinFunctionType)

# isinstance，可用于判断class
print(isinstance("asd", str))
print(isinstance(1, int))
print(isinstance({}, dict))
print(isinstance('abc', Iterable))  # 是否可迭代
print(isinstance([1, 2, 3], (list, tuple)))  # 是否是其中一种
print(isinstance(MyDemoClass(), MyDemoClass))


'''
------类型转换操作------
'''
# 数字类型转换
#   第二个参数是表示第一个参数值的进制
print(int('12', 10))
print(int('10', 2))
print(float('12'))

# 字符串类型转换
print(str([1, 2, 3]))
print(ord('a'))  # 字符 -> ASCII 数值
print(chr(98))  # 0～255 ASCII 数值 -> 字符
print(eval('pow(2,2)'))  # 字符串 -> python表达式，常用于字符转字典

# 布尔值转换
print(bool(0))
print(bool(1))

# 复杂类型转换
print(tuple([1, 1, 2, 3, 3]))
print(list((1, 1, 2, 3, 3)))
print(set([1, 1, 2, 3, 3]))
print(dict([('a', 1), ('b', 2), ('c', 3)]))

# json object dict
my_object = MyClass()
print(json.dumps({'a': 1}))  # dict => json
print(json.dumps(my_object.__dict__))  # object => dict => json
print(json.loads(r'{"demo": 1, "demo2": 2}'))  # json => dict
my_object.__dict__ = json.loads(r'{"demo": 1, "demo2": 2}')
print(my_object.demo2)  # json => dict => objedt

'''
------迭代器操作------
'''
# reduce返回累计计算结果
print(reduce(lambda x, y: x ** y, [2, 3, 4]))
# map循环函数返回一个迭代器，list将迭代器序列转为列表
print(list(map(lambda x: x ** x, [1, 2, 3])))
# filter过滤函数返回一个迭代器，tuple将迭代器序列转为元组
print(tuple(filter(lambda x: x % 2 == 1, [1, 2, 3])))
# sorted排序函数
print(sorted([36, 5, -12, 9, -21]))
#    按abs函数绝对值来排序
print(sorted([36, 5, -12, 9, -21], key=abs))
#    按小写字母排序，并反转
print(sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True))

'''
------运算符操作------
'''

# 算术运算符
x = 5
y = 2
#   加，对象相加，不同类型之间不能相加，需要类型转换
print(x + y)
print(str(y) + '0')
print([1] + [2])
#   减，数字类型相减
print(x - y)
#   乘，数字相乘或者是重复N次的意思
print(x * y)
print('121' * 2)
print([1, 2] * 2)
print((1, 2) * 2)
#   除，数字相除
print(x / y)  # 计算结果为浮点数
print(x // y)  # 计算结果为整数，向下取整
#   取余
print(x % y)
#   次幂
print(x ** y)

# 关系运算符
x = 1
y = 'a'
#   等于
print(x == 1)
print(1 == True)
print(0 == False)
#   不等于
print(x != y)
print(1 != '1')
#   大于，同类型才能比较，不同类型之间需要类型转换
print(2 > x)
print(y > 'A')  # 字符串比较ASCII
#   小于，同类型才能比较，不同类型之间需要类型转换
print(x < 3)
print(y < 'b')  # 字符串比较ASCII
#   大于等于
print(x >= 1)
#   小于等于
print(x <= 1)
#   比较聚合，注意js不能这样写
#     x大于0并且小于2
print(0 < x < 2)
#     x小于10并且还小于2
print(10 > x < 2)

# 赋值运算符
x = 1
y = 'a'
# 语法糖
x += 1  # x = x + 1
x -= 1  # x = x - 1
x *= 1  # x = x * 1
x /= 1  # x = x / 1
x //= 1  # x = x // 1
x %= 1  # x = x % 1
x **= 1  # x = x ** 1
#   海象运算符，版本3.8+，可以无需再单独在一行声明一个变量
if (n := len(y)) > 10:
    print(f'y`length is {n}')
else:
    print(f'y`length is {n}')

# 位运算符
a = 60            # 60 = 0011 1100
b = 13            # 13 = 0000 1101
c = 0
#   &按位与运算
c = a & b        # 12 = 0000 1100
print('1 - c 的值为：', c)
#   |按位或运算
c = a | b        # 61 = 0011 1101
print('2 - c 的值为：', c)
#   ^按位异或运算
c = a ^ b        # 49 = 0011 0001
print('3 - c 的值为：', c)
#   ~按位取反运算
c = ~a           # -61 = 1100 0011
print('4 - c 的值为：', c)
#   <<左移运算
c = a << 2       # 240 = 1111 0000
print('5 - c 的值为：', c)
#   >>右移运算
c = a >> 2       # 15 = 0000 1111
print('6 - c 的值为：', c)

# 逻辑运算符
#   and运算，与运算
print(True and False)
print(True and 3 > 1)

#   or运算，或运算
print(True or False)
print(False or not 3 > 1)

#   not运算，非运算
print(not True)
print(not 1 > 1)
print(not None)

# 成员运算符
str0 = 'abc'
list0 = [1, 2, 3, 4, 5]
tuple0 = (1, 2, 3, 4, 5)
dictionary0 = {'a': 1, 'b': 2, 'c': 3}

#   in 是否存在
print('a' in str0)
print('d' in str0)
print(1 in list0)
print(6 in list0)
print(1 in tuple0)
print(6 in tuple0)
print('a' in dictionary0)
print('d' in dictionary0)

#   not in 是否不存在
print('d' not in str0)
print(6 not in list0)
print(6 not in tuple0)
print('d' not in dictionary0)

# 身份运算符
a = 20
b = 20
list0 = [1, 2, 3]
list1 = list0
list2 = [1, 2, 3]

#   is 是否是同一个对象引用
#     a is b 为True，是因为都指向了同一个内存地址20，值类型有：字符串，数字，元组
print(a is b)
print(list0 is list1)
#     list0 is list2为False，是因为列表是引用类型，虽然两个值相等，但是是不同的内存地址，引用类型：列表，集合，字典
print(list0 is list2)

#   is not 是否不是同一个对象引用
print(list0 is not list2)

#   == 相等判断是判断值是否相同，不判断内存地址
#     下面两个都为True
print(a == b)
print(list0 == list2)

'''
------逻辑语句------
'''
# if else 只要条件是非零数值、非空字符串、非空list等，就判断为True，否则为False
x = random.choice(range(100))
y = random.choice(range(100))
if x > y:
    print('x:', x)
elif x == y:
    print('x + y:', x + y)
else:
    print('y:', y)
#   三元运算符，如果x大于50，z就是1，否则为0
z = 1 if x > 50 else 0

# while else
count = 0
while count < 5:
    print(count, ' 小于 5')
    count = count + 1
else:
    print(count, ' 大于或等于 5')
print('完成while循环')

# for else，这个else应用场景非常少，和break搭配使用
list1 = ['1', '2', '3', '4']
for item in list1:
    if item == '5':
        break
else:
    print("没有找到5")
print('完成循环!')

# for range()函数，得到一个数字序列 => 0,2,4
for item in range(0, 5, 2):
    if item == 0:
        # 不打印0
        continue
    elif item == 4:
        # 什么都不做，因为python靠缩进来控制逻辑，用pass占位
        pass
    print(item)

# for 列表
for value in [1, 2, 3, 4]:
    print(value)
for x, y in [[1, 2], [3, 4], [5, 6], [7, 8]]:
    print(x, y)
for index, value in enumerate(['1', '2', '3']):
    print(index, value)
for key, value in zip(['a', 'b', 'c'], ['1', '2', '3']):
    print(key, value)

# for 字典
for key in {'a': 1, 'b': 2, 'c': 3}:
    print(key)
for value in {'a': 1, 'b': 2, 'c': 3}.values():
    print(value)
for key, value in {'a': 1, 'b': 2, 'c': 3}.items():
    print(key, value)

# 推导式
#   列表推导式，将一个序列构建成新的列表
#     每个值乘2得到新列表
print([item*2 for item in [1, 2, 3]])
#     如果大于1则放入新列表，就是过滤掉不符合后面if条件的
print([item for item in [1, 2, 3] if item > 1])
#     if和else，如果不符合条件就用else的做返回，三元运算
print([item if item > 1 else -item for item in [1, 2, 3]])

#   generator推导式，将一个序列构建成生成器对象
generator0 = (item for item in (1, 2, 3))
print(next(generator0))
for v in generator0:
    print(v)
#     每个值乘2得到generator，再使用tuple转为元组
print(tuple(item*2 for item in (1, 2, 3)))
#     如果是奇数则放入新元组，就是过滤掉不符合后面if条件的
print(tuple(item for item in (1, 2, 3) if item % 2 == 1))

#   集合推导式，将一个序列构建成新的集合
#     每个值2次幂得到新集合
print({item**2 for item in {1, 2, 3}})
#     如果是奇数则放入新集合，就是过滤掉不符合后面if条件的
print({item for item in {1, 2, 3} if item % 2 == 1})

#   字典推导式，将一个序列构建成新的字典
#     每个值2次幂得到新字典
dictionary0 = {'a': 1, 'b': 2, 'c': 3}
print({key: dictionary0[key]**2 for key in dictionary0})
#     如果是奇数则放入新字典，就是过滤掉不符合后面if条件的
print(
    {key: dictionary0[key] for key in dictionary0 if dictionary0[key] % 2 == 1}
)

'''
------错误和异常------

常见错误：
SyntaxError -- 语法错误
TypeError -- 类型错误，字符串类型和数字类型不能混合操作
ValueError -- 传给函数的参数类型错误
NameError -- 未声明错误，没有定义该变量
AttributeError -- 对象没有属性错误
IndexError -- 索引超出序列范围错误
KeyError -- 没有属性错误，字典没有关键字
IndentationError -- 缩进错误，混用了tab和空格
IOError -- 文件输入输出错误
ZeroDivisionError -- 除数为0
ValidationError -- 验证器错误
'''
arg = 'test.txt'
try:
    f = open(arg, 'r')
    # 这个语法虽然看上去正确，但是会触发ZeroDivisionError
    demo = 1/0
except IOError:
    print('io异常，无法打开', arg)
except ZeroDivisionError:
    print('除数不能未0')
except Exception as exception:
    # Exception是基类
    print(exception, '捕获到了其他任何异常')
else:
    print(arg, 'has', len(f.readlines()), 'lines')
    f.close()
finally:
    print('这个一定会打印')

try:
    # 抛出一个NameError
    raise NameError('HiThere')
except NameError:
    print('An exception flew by!')
    # raise 这个raise会继续抛出错误


class MyError(Exception):
    # 自定以Error，继承了Exception，多继承使用逗号分割，并覆盖了两个内置方法
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


'''
------函数与类------
'''


def myMax(a, b=2):
    # 通过 def 关键字来定义函数
    # 默认参数必须指向不变对象，要不该参数会保留上次结果
    if a > b:
        return a
    else:
        return b


# 通过 lambda 关键字来定义匿名函数，只需要写表达式
print(lambda x: x ** x, [1, 2, 3])


def createfunc(n):
    # 返回一个函数
    return lambda a: a * n


mydoubler = createfunc(2)
mytripler = createfunc(3)
print(mydoubler(2))
print(mytripler(2))

# 位置传参
print(myMax(1, 2))
# 关键字传参
print(myMax(a=1, b=2))
# 位置传参+默认值
print(myMax(1))


def f(a, b, /, c, d, *, e, f):
    # 参数 a 和 b 必须使用指定位置参数，c 或 d 可以是位置参数或关键字参数，而 e 和 f 要求为关键字参数
    # / 强制位置参数，版本3.8+
    # * 可以让之后的参数都为关键字参数
    print(a, b, c, d, e, f)


def myArgs(a, b):
    print(a, b)


def myArgs1(a, *tuple1):
    # 解包
    print(a, *tuple1)
    # 切片
    print((a, *tuple1))


def myArgs2(a, **dictionary1):
    # 解包，不能用**来解包字典
    print('a', *dictionary1)
    # 切片
    print({'a': a, **dictionary1})


def myArgs3(*args, **kwargs):
    # *args称之为Non-keyword Variable Arguments，无关键字参数；
    # **kwargs称之为keyword Variable Arguments，有关键字参数；

    # 解包
    print(args)
    # 切片
    print(kwargs)


# 位置传参 + 关键字参数
myArgs(1, b=3)
# *打包成元组
myArgs1(1, 2, 3, 4)
myArgs1(1)
# **打包成字典
myArgs2(1, b=2, c=3)
myArgs2(1)
# *args, **kwargs
myArgs3(1, 2, b=3, c=4)


class MyClass:
    # 一个简单的类
    # __slots__用来限制实例可以绑定的属性名称，了解即可
    # __双下划线表示私有，方法也是同样规则，外部无法通过该变量名访问
    __num = 1
    # 单划线也表示私有，但它是约定熟成的私有，并不是官方规定，是可以访问的
    _num1 = 1
    str = 'hello world'

    # 构造函数
    def __init__(self, num=1):
        self.__num = num

    # 实例方法第一个参数必须是self，它指向实例
    def getNum(self):
        # 取得实例过后的__num
        return self.__num

    def setNum(self, num):
        self.__num = num

    # 如果不加self，那它等同于静态方法
    def getNum1():
        # 取得默认值1
        return MyClass._num1


# MyClass()就是创建新实例，MyClass就是静态调用
myClassInstance = MyClass()
myClassInstance.str1 = 1
myClassInstance.setNum(10)
print("MyClass实例", MyClass().str, MyClass(3).getNum())
print("MyClass实例", myClassInstance.__dict__)
print("MyClass类", MyClass.getNum1(), MyClass._num1)
try:
    myClassInstance.demo = 1
except:
    print('AttributeError 无法赋值')
try:
    print("MyClass类", MyClass.__num, MyClass().__num)
except:
    print('AttributeError 无法访问内部变量')


class MyClass1(MyClass):
    # 继承MyClass，私有变量无法继承
    __num = 1

    def __init__(self, *args, **kwargs):
        super(MyClass1, self).__init__(*args, **kwargs)

    def getNum(self):
        # 覆盖父类中的getNum
        return self.__num * 2


print("MyClass1实例", MyClass1().str, MyClass1()._num1, MyClass1(3).getNum())


class Student(object):

    # 会产生一个get_score方法
    @property
    def score(self):
        return self._score

    # 会产生一个set_score方法
    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value


student = Student()
student.score = 100  # 其实调用的是set_score方法
print('Student', student.score)  # 其实调用的是get_score方法

# 利用type创建类


def fn(self, name='world'):
    #   先定义函数
    print('Hello, %s.' % name)


#   创建Hello class，分别为class名称，继承父类的集合，第三个参数以字典形式绑定属性
Hello = type('Hello', (object,), dict(hello=fn))
Hello().hello()

'''
------枚举------
'''
month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May',
                       'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
print(month.Jan)
print(month.Jan.name)
print(month.Jan.value)  # 默认是int值，从1开始


@unique
class Weekday(Enum):
    Sun = 0  # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6


for name, member in Weekday.__members__.items():
    print(name, '=>', member)


'''
------模块与包------

模块引入方法：

这里的moduleName也就是文件名,funcName和className分别是函数和类
import moduleName -- 引入一个模块，使用模块.方法/类/变量来使用该方法/类/变量，这种方法在版本3已被废弃，只能引入lib中的包
from moduleName import funcName,className -- 只引入一个模块的方法/类/变量，直接调用方法/类/变量，需要避免同名变量覆盖
from moduleName import * -- 引入模块的所有内容，直接调用即可，需要避免同名变量覆盖，避免使用该方法

包内部引入模块：

from . import moduleName -- 从当前文件夹相对导入一个模块，.代表当前模块，..代表上层模块，...代表上上层模块，依次类推
from package import moduleName -- 从指定包绝对导入一个模块
'''

print(dir())  # 函数可提供当前模块的定义的所有名称，包括自身定义的和引入模块的，以字符串列表返回

# 包
#   只有一个目录包含了__init__.py文件才认作一个包
#   包之间可以嵌套，嵌套的包就是一个子包
#   当__init__.py存在一个__all__的变量，那么在使用 from package import * 的时候就把这个列表变量中的模块导入，这个变量就表示是*的意思

'''
------os------

os:
os.mkdir() -- 创建文件夹
os.getcwwd() -- 获取工作目录

os.path:
os.path.join(path1[, path2[, ...]]) -- 拼接路径
os.path.split(path) -- 把路径分割成 dirname 和 basename，返回一个元组
'''
the_path = os.path.split(os.path.realpath(__file__))[0]  # 脚本目录
cwd_path = os.getcwd()  # 工作目录
os.mkdir(os.path.join(the_path, 'test'))

'''
------File------

File:

fsObj = open(路径,读取模式) -- open函数用来打开一个文件，x新建文件，r只能读取，w覆盖写入，a文件追加
fsObj.close() -- close函数用来关闭一个文件对象
fsObj.tell() -- 返回文件当前位置
fsObj.seek(offset[, whence]) -- 移动文件读取指针到指定位置
fsObj.read([size]) -- 读取多少个字符，默认读全部
fsObj.readline([size]) -- 读取一行并且包括\n，存在size则读取多少个字符
fsObj.write(str) -- 追加写入
fsObj.writelines(sequence) -- 追加写入列表
'''
# 写
with open(os.path.join(the_path, 'test/test.txt'), 'w', encoding='utf-8') as f:
    # with ... as ... 可以自动处理异常，还可以自动关闭和清理资源
    f.write('test\ntest\ntest\n')
    f.writelines(['testLine\n', 'testLine\n', 'testLine'])
# 读
with open(os.path.join(the_path, 'test/test.txt'), 'r', encoding='utf-8') as f:
    print('3', f.readline())  # 读取后会改变文件指针
    print('4', f.readline())

'''
------Regexp------

Regexp:

re.match(pattern, string, flags=0) -- 使用正则匹配
re.search(pattern, string, flags=0) -- 使用正则搜索
re.sub(pattern, repl, string, count=0, flags=0) -- 使用正则替换
re.compile(pattern[, flags]) -- 生成一个正则表达式（ Pattern ）对象
pattern.findall(string[, pos[, endpos]]) -- 正则匹配的所有子串，并返回一个列表
re.split(pattern, string[, maxsplit=0, flags=0]) -- 能够匹配的子串将字符串分割后返回列表
'''
