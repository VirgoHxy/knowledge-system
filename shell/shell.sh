#!/bin/sh

: <<EOF
------多行注释------
这些都是linux环境的解释头

#!/bin/sh -- 使用sh解释器

#!/bin/bash -- 使用bash解释器

#!/usr/bin/env bash -- 使用环境变量中PATH的程序
EOF

: <<EOF
------提示------
EOF
# ${变量} -- 使用变量
# $(命令) -- 命令替换,将命令结果传给变量;也可以使用`命令`,但是还是推荐使用$(命令)
# $((C语言运算)) -- 只要符合C语言运算规则,即可运行,一般用于数字运算
# ${#变量} -- 获取长度
# ${变量:索引:长度} -- 从已定索引开始,将变量截取已定长度(省略将会截取到末尾)
# [条件]或者[[条件]] -- 表示检测命令,也就是判断逻辑;sh中一般为[],bash中为[[]]
# {序列集合} -- {0..9}就是表示0到9之间的数
# (命令) -- 开启子shell
# ((数字运算)) -- 常用数字表达式运算,真返回1,假返回0
# 常用工具
## curl,wget -- 发送网络请求
## awk,sed -- 文本处理工具
## bc -- 浮点运算等高级计算器
## APT(Ubuntu),Yum(CentOS),pacman(Arch Linux) -- 软件包管理工具
## grep -- 支持正则的文件搜索工具

# 常用命令
## ls -- 查看目录详情,如果不加参数,默认为工作目录
### 示例 -- ls option 路径
### option
#### -l -- 显示详细的文件信息
#### -a -- 显示隐藏文件

## cd -- 切换工作目录,如果不加参数,默认为home目录
### 示例 -- cd 路径
### 常用路径
#### ~ -- 表示home目录
#### - -- 表示切换前的目录(已经进行过一次目录切换)
#### / -- 绝对路径的根目录(这里的绝对路径是git bash的目录 因为这里我使用的git-bash.exe来运行.sh)
#### .. -- 返回上一级目录

## pwd -- 输出工作目录
### 示例 -- pwd

## mkdir -- 创建目录
### 示例 -- mkdir -p 目标目录
### option
#### -p -- 如果路径父目录也不存在将会一并创建

## cp -- 复制目录或文件
### 示例
#### cp option 源文件名 目标文件名
#### cp -r 源目录 目标目录 -- 递归复制目录
#### cp option 多个源文件名 目标目录
#### 如果目标目录已存在,将会复制源目录为其子目录;如果目标目录父目录不存在会报错
### option
#### -r -- 递归复制,用来复制目录
#### -a -- 递归复制,保留原文件属性的前提下复制文件
#### -f -- 强行复制文件或目录,不管指定文件或目录是否已经存在
#### -u -- 在源文件的修改时间比目标文件新的时候才复制,或者在目标目录不存在源目录的文件时才复制

## rm -- 删除目录或文件
### 示例
#### rm option 目标文件名
#### rm -r 目标目录 -- 递归删除目录
### option
#### -r -- 递归删除,用来删除目录
#### -f -- 强制删除
#### -i -- 删除前先询问确认

## mv -- 移动目录或文件
### 示例
#### mv 源文件名 目标文件名 -- 重命名效果
#### mv 源文件名 目标目录
#### mv 源目录 目标目录

## cat -- 查看文件内容
### 示例
#### cat 源文件名

## grep -- 搜索文本
### 示例
#### grep option 搜索内容 文件名
### option
#### -i -- 忽略大小写
#### -E -- 正则搜索
#### -n -- 显示行号

## find -- 搜索文件,默认递归
### 示例
#### find 目录 -name 文件名
#### find 目录 -type 文件类型
#### find 目录 -size +文件大小 -- 大于这个size的文件(b,k,M,G)
#### find 目录 -size -文件大小 -- 小于这个size的文件(b,k,M,G)
### option
#### -name -- 按照文件名字查找
#### -type -- 按照文件类型查找(f一般文件,d目录,l链接文件)
#### -size -- 按照文件大小查找

## chmod -- 权限设置
### 示例
#### chmod 权限值 文件名
##### 权限值为三个数字拼接在一起,对应: u(所有者权限), g(所属组权限), o(其他用户权限)
##### 具体权限也为三个数字,对应: r(读), w(写), x(执行);按照二进制顺序分别为: 读(4 = 2**2),写(2 = 2**1),执行(1 = 2**0)

## kill -- 删除程序

## sed -- 编辑文本
### 示例
#### sed -e expression 源文件 > 目标文件 -- 处理文件并将结果重定向到目标文件
#### sed -f file 源文件 > 目标文件 -- 处理文件并将结果重定向到目标文件
### option
#### -e -- 以指定的动作处理文件
#### -f -- 以指定的脚本处理文件
### 动作
#### a -- 新增, a 的后面可以接字串,而这些字串会在新的一行出现(目前的下一行)
#### c -- 取代, c 的后面可以接字串,这些字串可以取代 n1,n2 之间的行
#### d -- 删除,因为是删除啊,所以 d 后面通常不接任何东东;
#### i -- 插入, i 的后面可以接字串,而这些字串会在新的一行出现(目前的上一行);
#### p -- 打印,亦即将某个选择的数据印出;通常 p 会与参数 sed -n 一起运行
#### s -- 取代,可以直接进行取代的工作哩;通常这个 s 的动作可以搭配正规表示法,例如 1,20s/old/new/g 就是啦

## tar -- 解压缩
### 示例
#### tar -cf 目标压缩文件.tar 源文件或文件夹
#### tar -czf 目标压缩文件.gz 源文件或文件夹
#### tar -xf 压缩文件.tar
#### tar -xzf 压缩文件.gz
### option
#### -c -- 建立压缩包
#### -f -- 压缩包的名字,这个参数只能在最后
#### -z -- 压缩包为gzip类型
#### -x -- 解压

## zip -- 解压缩
### 示例
#### zip 目标压缩文件.zip 源文件或文件夹
#### unzip 压缩文件.zip

## rar -- 解压缩
### 示例
#### rar a 目标压缩文件.rar 源文件
#### rar a -r 目标压缩文件.rar 源文件夹
#### unrar x 压缩文件.rar

: <<EOF
------输出------
EOF
# 普通输出
echo "hello world"
# 转义输出
echo "hello \"demo\""
# 变量输出,双引号来输出变量(推荐使用),单引号不会输出变量,也不能出现转义单引号
demo="demo"
echo "hello ${demo}"
echo 'hello ${demo}'
echo 'hello '${demo}''
# 特殊转义输出,-e 开启转义,\n为换行符,\c为结尾不换行,\r回车符
echo -e "hello\nworld"
echo -e "hello\c"
echo -e " world"
# 获取用户输入;-n 不换行输出,read读取为变量x
# echo -n "enter first num: " && read x && echo ${x}
# 重定向输出到文件;注意会覆盖原有内容;反过来就是输入到一个变量,变量<文件
echo "test echo" >shell.log
# 重定向输出并追加到文件;反过来就是输入到一个变量,变量<<文件
echo "test echo1" >>shell.log

# 普通输出,默认开启转义,原样输出
printf "hello
world
"
printf "hello world\n"
# 参数输出,%d表示数字,%s表示字符串,%c表示一个字符,%f表示小数
printf "%d %s\n" 12 "abc"
## 类型不能转换报警(报警不会停止运行),以及不传参数,这两种情况都会有默认值,%d默认值0,%s默认值"",也就是空字符串
printf "%d %s\n" "abc" 12
## 多出的参数任然按照命令输出
printf "%d %s\n" 12 "a" 11 "b" 10 "c" 9
# 格式化输出,%-17s表示左对齐,字符宽度为17,多的全部显示,不够用空格来补;字母,空格,下划线算一个字符宽度;一个中文算三个字符宽度,但是实际上一个中文占两个字符宽度,所以一个中文补一个宽度即可与字母对齐
printf "%-17s %s \n" 姓名 性别
printf "%-15s %s \n" hxy 男
printf "%-15s %s \n" dojacat 女
printf "%-17s %s \n" 哼哈 男
printf "%-16s %s \n" 哼 男
printf "%-16s %s \n" 这段文字将超出,不再对齐 ?

: <<EOF
------变量------
EOF
# 声明局部变量,只在当前脚本有效
demo="demo"
echo ${demo}
# 声明环境变量,在当前shell会话都有效
export demo1="demo1"
# 声明局部变量,在当前shell脚本都有效,如果在函数内,就是函数内的局部变量
local demo2="demo2"
# 只读变量,变量可重复声明,后面的值会替换前面的值
readonly demo="demodemo"
echo ${demo}
# demo="demo3" ## 修改只读变量会报错(停止运行)
# 删除变量
demo3="demo3"
unset demo3
## 删除成功,变成空字符串
echo ${demo3}
## 删除只读变量会报警
unset demo
# 查看变量
## env # 查看环境变量
## set # 查看所有变量

# 全局变量,与当前系统有关,仅列出部分
## 用户目录
printf "${HOME}\n\n"
## 操作系统的环境变量PATH
printf "${PATH}\n\n"
## 当前工作目录
printf "${PWD}\n\n"
## 系统编码
printf "${LANG}\n\n"
## 当前默认的shell解释器
printf "${SHELL}\n\n"
## 0 到 32767 之间的随机整数
printf "${RANDOM}\n\n"

# 局部变量,与当前脚本有关,仅列出部分
## 当前脚本的shell解释器
printf "${BASH}\n\n"
## Windows中提供类unix环境的系统类型
printf "${OSTYPE}\n\n"
## 当前用户的用户id 1092286
printf "${UID}\n\n"

# 特殊变量
## $0	当前脚本的文件名
## $n	传递给脚本或函数的参数;n 是一个数字,表示第几个参数;例如,第一个参数是$1,第二个参数是$2
## $#	传递给脚本或函数的参数个数,不包括$0
## $*	传递给脚本或函数的所有参数;在存在字符串参数时,*会把存在空格的元素分隔开,而@不会
## $@	传递给脚本或函数的所有参数;在存在字符串参数时,*会把存在空格的元素分隔开,而@不会
## $?	上个命令的退出状态,或函数的返回值
## $$	当前 Shell 进程 ID;对于 Shell 脚本,就是这些脚本所在的进程 ID
### 函数传参: func arg1 arg2 arg3
### 脚本传参: .sh arg1 arg2 arg3

: <<EOF
------字符串操作------
EOF
str="hxy"
# 字符串长度
echo ${#str}
# 字符串截取
## 从索引1(包含该索引)开始截取到末尾
str1=${str:1}
echo ${str1}
## 从索引1(包含该索引)开始截取1位
str2=${str:1:1}
echo ${str2}
## 使用%,%%,#,##
str3="hxyyxhhxy"
### %去掉右边的最短的匹配项,%%去掉右边的最长的匹配项
echo ${str3%x*y}
echo ${str3%%x*y}
### #去掉左边的最短的匹配项,%%去掉左边的最长的匹配项
echo ${str3#h*h}
echo ${str3##h*h}
# 字符串查找 这里获取的不是index而是position,也就是第几个(index+1)
text="hello"
position=$(expr index ${text} "o")
echo ${position}
# 从文件中查找内容,并显示行数;查找三个点,注意需要转义
grep -n "\.\.\." prod/*.js
# 从文件中按照正则规则查找内容;查找8位数字
grep -E "\b[[:digit:]]{8}\b" *.js

: <<EOF
------数组操作------
EOF
arr=([0]=0 [1]=1 [2]=2)
arr1=("零" "一" "二 三")
# 访问数组
## 通过索引访问
echo ${arr[0]}
echo ${arr1[0]}
## 访问全部;@和*区别,只有当数组的元素有双引号时才会有区别,*会把存在空格的元素分隔开,而@不会
printf "%s\n" ${arr[@]}
printf "%s\n" ${arr[*]}
echo "这里的\"二 三\"被换行隔开: "
printf "%s\n" ${arr1[@]}
echo "这里的\"二 三\"被换行隔开: "
printf "%s\n" ${arr1[*]}
echo "这里的\"二 三\"在一行: "
printf "%s\n" "${arr1[@]}"
echo "都在一行: "
printf "%s\n" "${arr1[*]}"
# 截取
## 从索引1(包含该索引)开始截取到末尾
echo ${arr[@]:1}
## 从索引1(包含该索引)开始截取1位
echo ${arr[@]:1:1}
# 数组长度
echo ${#arr[@]}
# 修改数组
## 根据索引修改数组
arr2=(1 2 3)
arr2[0]=3
arr2[1]=2
arr2[2]=1
echo ${arr2[@]} "长度" ${#arr2[@]}
## 重新声明修改数组
arr=(${arr[@]} 3 4)
echo ${arr[@]} "长度" ${#arr[@]}
### 字符串数组加双引号,这里"二 三"为一个元素,要不空格隔开会变成两个元素
arr1=("${arr1[@]}" "四" "五")
echo ${arr1[@]} "长度" ${#arr1[@]}
# 删除数组,也可以使用截取方法
## 删除第一项
unset arr1[0]
echo "删除第一项:" ${arr1[@]} "长度" ${#arr1[@]}
### 删除成功后 数组长度会改变,数组元素不会显示但是它的索引不会删除
echo ${arr1[0]}
### 删除后需要重新再声明,才是正常的操作索引
arr1=("${arr1[@]}")
echo ${arr1[0]}
## 删除最后一项
unset arr1[$(expr ${#arr1[@]} - 1)]
echo "删除最后一项:" ${arr1[@]} "长度" ${#arr1[@]}
## 根据值删除,这个就不用担心索引问题
arr1=(${arr1[@]/"二 三"/})
echo "值删除:" ${arr1[@]} "长度" ${#arr1[@]}
## 根据内容删除
arr3=("hxy" "hcy" "wsl" "lsm")
### 删除包含h的元素
arr3=(${arr3[@]/*"h"*/})
echo "内容删除:" ${arr3[@]} "长度" ${#arr3[@]}

: <<EOF
------运算符操作------

请注意运算符的左右需要有空格
EOF
# 算术运算符
x=0
y=1
## expr;不支持小数,所以只会有整数
echo "+:" $(expr ${x} + 1 + ${y})
echo "-:" $(expr ${x} - 1)
## *因为有其他含义,所以需要转义
echo "*:" $(expr ${y} \* 2)
echo "/:" $(expr ${y} / 2)
echo "%:" $(expr ${y} % 2)
## $((数字运算));不支持小数,所以只会有整数
## 相等判断,相等返回true(1),不相等返回false(0)
echo $((0 == 1))
echo $((0 == x))
echo $((x == y))
### 不判断类型
echo $(("1" == 1))
## 不相等判断,不相等返回true(1),相等返回false(0)
echo $((0 != 1))
echo $((0 != x))
echo $((x != y))
### 不判断类型
echo $(("1" != 1))
## 数字转为布尔判断
if ((-1 && 1)); then
  echo "这个会输出,除了0都为true"
fi
if ((0)); then
  echo "这个不会输出,0为false"
fi
## 小数运算
x=0.1
y=1.2
### 借助bc或者awk工具
if (($(echo | awk "{printf ${x} == ${y}"}))); then
  echo "equal"
else
  echo "not equal"
fi

# 关系运算符
x=2
y=10
## 关系运算符只比较数字,如果字符串可以转换为数字,可正常比较,不可以转换将会报警
if [ "2a" -eq ${y} ]; then
  echo "2a不能转换为数字,会报警"
fi
if [ ${x} -eq "2" ]; then
  echo "-eq 相等返回true"
fi
if [ ${x} -ne ${y} ]; then
  echo "-ne 不相等返回true"
fi
if [ 11 -gt ${y} ]; then
  echo "-gt 左边20大于右边y返回true"
fi
if [ ${x} -lt ${y} ]; then
  echo "-lt 左边x小于右边y返回true"
fi
if [[ 10 -ge ${y} && 11 -ge ${y} ]]; then
  echo "-ge 左边10和11大于等于右边y返回true"
fi
if [[ 10 -le ${y} && 9 -le ${y} ]]; then
  echo "-le 左边10和9小于等于右边y返回true"
fi
## 也可以使用数学符号
if [ ${x} == 2 ]; then
  echo "== 相等返回true"
fi
if [ ${x} != ${y} ]; then
  echo "!= 不相等返回true"
fi
### 但是非常注意数字逻辑要放在(())中,要不会当成字符串比较
if ((11 > ${y})); then
  echo "> 左边11大于右边y返回true"
fi
if ((${x} < ${y})); then
  echo "< 左边x小于右边y返回true"
fi
if ((10 >= ${y} && 11 >= ${y})); then
  echo ">= 左边10和11大于等于右边y返回true"
fi
if ((10 <= ${y} && 9 <= ${y})); then
  echo "<= 左边10和9小于等于右边y返回true"
fi

# 布尔运算符
x=0
y=1
if [ ! 0 -eq ${y} ]; then
  echo "-eq 本来是相等判断,加上!后和-ne效果相同"
fi
if [ 0 == 0 -o 1 == 2 ]; then
  echo "-o 或运算 类似于js中的 ||"
fi
if [ ${x} == 0 -a ${y} == 1 ]; then
  echo "-a 与运算 类似于js中的 &&"
fi
## 下面两个都返回的false,不会走then的逻辑
if [ 0 == 1 -o 1 == 2 ]; then
  echo "-o 或运算 类似于js中的 ||"
fi
if [ ${x} == 1 -a ${y} == 1 ]; then
  echo "-a 与运算 类似于js中的 &&"
fi

# 逻辑运算符;但需要多加一层中括号
if [[ 0 == 0 || 1 == 2 ]]; then
  echo "-o 也可以使用||"
fi
if [[ ${x} == 0 && ${y} == 1 ]]; then
  echo "-a 也可以使用&&"
fi

# 字符串运算符
x="abc"
y="123"
z=""
if [ ${x} = "abc" ]; then
  echo "=或者== 字符串相等判断,相等返回true,不相等返回false"
fi
if [ ${y} == 123 ]; then
  echo "=或者== 字符串相等判断,相等返回true,不相等返回false"
fi
if [ ${x} != ${y} ]; then
  echo "!= 字符串不相等判断,不相等返回true,相等返回false"
fi
if [ -z ${z} ]; then
  echo "-z 字符串长度是否为 0,为 0 返回true,反之返回false"
fi
if [ -n ${x} ]; then
  echo "-n 字符串长度是否不为 0,不为 0 返回true,反之返回false"
fi
## 也可以比较长度是否为0
if [ ${#z} == 0 ]; then
  echo "\${#z} 字符串长度是否为 0,为 0 返回true,反之返回false"
fi
if [ ${#x} != 0 ]; then
  echo "\${#x} 字符串长度是否不为 0,不为 0 返回true,反之返回false"
fi
if [ ${x} ]; then
  echo "将字符串作为条件,只要不为空就返回true"
fi
if [ ${z} ]; then
  echo "这个不会输出,因为变量z为空字符串"
fi

# 文件检测运算符
# path="C:\Windows\System32" ##这里是一个完整的路径
# path="/etc/hosts" ##这里的绝对路径是git bash的目录
path="./str.js" ##这里的相对路径是相对于运行目录(这里是knowledge-system)

## 仅列出部分文件检测运算符
if [ -r ${path} ]; then
  echo "${path} 路径可读"
else
  echo "${path} 路径不可读"
fi
if [ -w ${path} ]; then
  echo "${path} 路径可写"
else
  echo "${path} 路径不可写"
fi
if [ -x ${path} ]; then
  echo "${path} 路径可执行"
else
  echo "${path} 路径不可执行"
fi
if [ -f ${path} ]; then
  echo "${path} 路径是普通文件"
else
  echo "${path} 路径是目录,或文件是设备文件"
fi
if [ -d ${path} ]; then
  echo "${path} 路径是目录"
else
  echo "${path} 路径不是目录"
fi
if [ -s ${path} ]; then
  echo "${path} 路径是文件,且文件大小不为空"
else
  echo "${path} 路径不是文件,或文件大小为空"
fi
if [ -e ${path} ]; then
  echo "${path} 路径存在"
else
  echo "${path} 路径不存在"
fi

: <<EOF
------逻辑语句------
EOF

# if
## 数字条件要使用双括号
if ((1)); then
  echo "除了0都是true"
fi

## 前面条件为真就执行后面的命令
[ 1 == 1 ] && pwd
[ 0 == 1 ] && echo "不会输出"

## 前面条件为假才会执行后面的命令
[ 1 == 1 ] || echo "不会输出"
[ 0 == 1 ] || pwd

## 这就是完整的条件语句,由[ condition ]包起来的表达式被称作检查命令,注意bash中的表达式是双括号[[ condition ]]
: <<EOF
if [ condition ]; then
  # if body
elif [ condition ]; then
  # else if body
else
  # else body
fi
EOF

# case;这个js中的switch不同,不需要为每个条件写break
function operFn() {
  # 函数的局部变量
  local oper=$1
  local x=$2
  local y=$3
  local val
  case ${oper} in
  "+")
    val=$(expr ${x} + ${y})
    echo "${x} + ${y} = ${val}"
    ;;
  "-")
    val=$(expr ${x} - ${y})
    echo "${x} - ${y} = ${val}"
    ;;
  "*")
    val=$(expr ${x} \* ${y})
    echo "${x} * ${y} = ${val}"
    ;;
  "/")
    val=$(expr ${x} / ${y})
    echo "${x} / ${y} = ${val}"
    ;;
  *)
    echo 404
    ;;
  esac
  return ${val}
}

val="这个变量不会被 operFn 函数修改"
operFn "+" 1 2
## 接受函数整数返回值,必须紧跟函数后面
newVal=$?
echo "${val}"
echo "${newVal}"
## 接受函数输出返回值,但是只能用一条输出,否则返回值会混乱
unknownVal=$(operFn "asd" 1 2)
echo "${unknownVal}"

# for
: <<EOF
# 基础for循环
for((i=0;i<n;i++)); do
  echo "${i}"
done

# 嵌套for循环
for((i=0;i<n;i++)); do
  for((j=0;j<m;j++)); do
    echo "${i}, ${j}"
  done
done

# forin循环
for item in {"Hello World!",a,bc,1372}; do
  echo "${item}"
done

# 循环数组
for item in "${myArray[@]}"; do
  echo "${item}"
done

# 循环范围,应该是ascii规定的一组序列集合
for item in {a..z}; do
  echo "${item}"
done

for item in {A..Z}; do
  echo "${item}"
done

for item in {0..9}; do
  echo "${item}"
done
EOF

prefix="202"
suffix="-09-09"
for item in ${prefix}{0..9}${suffix}; do
  echo "${item}"
done

# while;条件为真就执行
val=0
while ((${val} < 10)); do
  echo ${val}
  ((val++))
done

# until;条件为假就执行
val=0
until ((${val} > 9)); do
  echo ${val}
  ((val++))
done

# select;和for循环一致,但是它是让用户选择输入选项编号
# select DRINK in tea cofee water juice appe all none; do
#   case ${DRINK} in
#   tea | cofee | water | all)
#     echo "Go to canteen"
#     ;;
#   juice | appe)
#     echo "Available at home"
#     ;;
#   none)
#     break
#     ;;
#   *)
#     echo "ERROR: Invalid selection"
#     ;;
#   esac
# done

# break用来结束循环,continue用来跳过循环

: <<EOF
------函数------
函数返回值 -- return 返回函数返回值,返回值类型只能为整数[0-255],超出将重新计算;如果不加 return 语句,默认将命令的运行结果,作为函数返回值
获取函数返回值 -- 在调用该函数后通过 $? 来获得,或者使用\$(函数)将命令结果进行变量替换
函数定义 -- 不会像js有函数提升,调用前必须已经定义
EOF

function operFnByCustom() {
  # 函数的局部变量
  local oper
  local x
  local y
  local val
  select oper in + - \* /; do
    case ${oper} in
    + | - | \* | /) ;;
    *)
      echo "Is not support! Please try again!" >>shell.log
      continue
      ;;
    esac
    read -p "enter first num: " x
    read -p "enter second num: " y
    case ${oper} in
    "+")
      val=$((x + y))
      break
      ;;
    "-")
      val=$((x - y))
      break
      ;;
    "*")
      val=$((x * y))
      break
      ;;
    "/")
      val=$((x / y))
      break
      ;;
    esac
  done
  # 这个适用于0-255的整数返回,并且只能搭配 $? 来获取返回值
  # return ${val}
  # 这个适用于任何返回,但是只能有且只有这一条命令,其他输出型命令需要重定向到其他文件,并且只能搭配 $() 来获取返回值
  echo "${x} + ${y} = ${val}" >>shell.log
  echo ${val}
}

# operFnByCustom
# echo "the result is: $?"

val=$(operFnByCustom)
echo "the result is: $val"
