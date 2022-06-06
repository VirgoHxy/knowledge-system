#!/usr/bin/env python3

from dataclasses import dataclass
import math
import random

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

python是区分大小写的，而且布尔值为True，False

python中的None和js的null是一个意思，表示啥都没存，''首先是字符串，再是空字符串

python六个标准的数据类型：
Number（数字）
    int、float、bool、complex（复数）
    不可变，值类型，理解为js中的简单类型
String（字符串）
    '' ''
    不可变，值类型，理解为js中的简单类型
Tuple（元组）
    不可变，值类型，理解为js中的简单类型
List（列表）
    可变，引用类型，理解为js中的复杂类型
Set（集合）
    可变，引用类型，理解为js中的复杂类型
Dictionary（字典）
    可变，引用类型，理解为js中的复杂类型
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

# 删除变量
del var1
del var2, var3, var4

'''
------字符串操作------
'''
var1 = 'string'
var2 = '''
多行字符串\n
并且识别转义符
'''
var3 = f'{1+2}'
var4 = 1
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
print('1,2,3'.split(','))
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


'''
------元组操作------
'''
# 元组和列表基本一致，但元组值不能二次赋值，相当于只读列表
tupleTemp = (1, 2, 3)

'''
------集合操作------
'''
# 集合不包含重复元素
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
# 字典键不能重复
dictionary1 = {'a': 1, 'b': 2, 'c': 3}

# 访问字典
print(dictionary1)
#   字典元素个数
print(len(dictionary1))
#   以key访问
print(dictionary1['a'])
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
print(dictionary1)

'''
------类型转换操作------
'''
# 数字类型转换
print(int('12', 10))
print(int('10', 2))
print(float('12'))

# 字符串类型转换
print(str([1, 2, 3]))
print(ord('a'))  # 字符 -> ASCII 数值
print(chr(98))  # 0～255 ASCII 数值 -> 字符
print(eval('pow(2,2)'))  # 字符串 -> 表达式

# 对象类型转换
print(tuple([1, 1, 2, 3, 3]))
print(list((1, 1, 2, 3, 3)))
print(set([1, 1, 2, 3, 3]))
print(dict([('a', 1), ('b', 2), ('c', 3)]))

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
# if else
x = random.choice(range(100))
y = random.choice(range(100))
if x > y:
    print('x:', x)
elif x == y:
    print('x + y:', x + y)
else:
    print('y:', y)

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
for index, value in enumerate(['1', '2', '3']):
    print(index, value)
for key, value in zip(['a', 'b', 'c'], ['1', '2', '3']):
    print(key, value)
# for 字典
for key in {'a': 1, 'b': 2, 'c': 3}:
    print(key)
for key, value in {'a': 1, 'b': 2, 'c': 3}.items():
    print(key, value)

# 推导式
dictionary0 = {'a': 1, 'b': 2, 'c': 3}
#   列表推导式，将一个序列构建成新的列表
#     每个值乘2得到新列表
print([item*2 for item in [1, 2, 3]])
#     如果大于1则放入新列表，就是过滤掉不符合后面if条件的
print([item for item in [1, 2, 3] if item > 1])

#   元组推导式，将一个序列构建成生成器对象
print((item for item in (1, 2, 3)))
#     每个值-1得到新元组
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
except:
    print('捕获到了其他任何异常')
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
    if a > b:
        return a
    else:
        return b


# 通过 lambda 关键字来定义匿名函数，只需要写表达式
print(list(map(lambda x: x ** x, [1, 2, 3])))


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
    # 形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 和 f 要求为关键字形参
    # 强制位置参数，版本3.8+
    print(a, b, c, d, e, f)


def myArgs(a, *, b):
    print(a, b)


def myArgs1(a, *tuple1):
    # 解包
    print(a, *tuple1)
    # 切片
    print((a, *tuple1))


def myArgs2(a, **dictionary1):
    # 解包
    print('a', *dictionary1)
    # 切片
    print({'a': a, **dictionary1})


# 位置传参，但是省略参数，后面参数必须用关键字参数
myArgs(1, b=3)
# *打包成元组
myArgs1(1, 2, 3, 4)
# **打包成字典
myArgs2(1, b=2, c=3)


class MyClass:
    # 一个简单的类

    # __双下划线表示私有，方法也是同样规则
    __num = 1
    str = 'hello world'

    # 构造函数
    def __init__(self, num):
        self.__num = num

    # 实例方法第一个参数必须是self，它指向实例
    def getNum(self):
        return self.__num


# MyClass()就是创建新实例
print("MyClass实例", MyClass().str, MyClass(3).getNum())


@dataclass
class MyClass1:
    # 一个简单的类，等同于MyClass，版本3.7+
    __num: int = 1
    str = 'hello world'

    # 实例方法第一个参数必须是self，它指向实例
    def getNum(self):
        return self.__num


print("MyClass1实例", MyClass1().str, MyClass1(3).getNum())


@dataclass
class MyClass2:
    # 一个简单的类，在MyClass1基础新增类方法和实例方法，版本3.7+
    __num: int = 1
    str = 'hello world'
    flag = True

    # 实例方法第一个参数必须是self，它指向实例
    def getNum(self):
        return self.__num

    # 静态方法，可以被类和实例类调用
    @staticmethod
    def getConst():
        return '常量'

    # 类方法，可以被类和实例调用
    @classmethod
    def getFlag(self):
        return self.flag


print("MyClass2实例", MyClass2(2).str, MyClass2(3).getNum(),
      MyClass2.getConst(), MyClass2.getFlag(),
      MyClass2().getConst(), MyClass2().getFlag())

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
# 只有一个目录包含了__init__.py文件才认作一个包
# 包之间可以嵌套，嵌套的包就是一个子包
# 当__init__.py存在一个__all__的变量，那么在使用 from package import * 的时候就把这个列表变量中的模块导入，这个变量就表示是*的意思

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
with open('test.txt', 'w', encoding='utf-8') as f:
    # with ... as ... 可以自动处理异常，还可以自动关闭和清理资源
    f.write('test\ntest\ntest\n')
    f.writelines(['testLine\n', 'testLine\n', 'testLine'])
# 读
with open('test.txt', 'r', encoding='utf-8') as f:
    print('3', f.readline())  # 读取后会改变文件指针
    print('4', f.readline())

'''
------标准库------

os -- 操作系统
glob -- glob.glob('*.py')可以生成文件名列表
re -- 正则表达式工具
math -- 数学工具
datetime -- 时间日期工具
'''
