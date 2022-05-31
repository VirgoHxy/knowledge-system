import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.StringJoiner;

public class Info {

  // 访问修饰符 用实例去调用
  String defaultVar = "1";
  /*
   * default
   * 默认的;当前类,同一包,子孙类可以访问;子孙类(不同包),其他包不能访问;
   * 在Info类和package定义为java.demo的可以访问
   */
  public String publicVar = "2";
  /*
   * public
   * 公共的;当前类,同一包,子孙类,子孙类(不同包),其他包都可以访问;
   * 任何类中都可以访问
   */
  private String privateVar = "3";
  /*
   * private
   * 私有的;当前类可以访问;同一包,子孙类,子孙类(不同包),其他包都不能访问;
   * 只有在Info类可以访问
   * 不能用private修饰类
   */
  protected String protectedVar = "4";
  /*
   * protected
   * 受保护的;当前类,同一包,子孙类可以访问;子孙类(不同包)可以访问extends对象继承下来的受保护对象,但不能访问父类的受保护对象;其他包不能访问;
   * 在Info类和package定义为java.demo的可以访问,在class extends Info的继承类实例中可以访问
   * 不能用protected修饰类
   */
  // 非访问修饰符
  static String staticVar = "5"; // static 静态的;只能用类去访问,不能用实例访问 -- Info.staticVar
  static final String constVar = "6"; // final 最后的;常量,不能修改,一般搭配static使用 -- Info.constVar

  // abstract void someMethod(); // abstract 抽象的;不能被实例化,只能在继承类中实现同名具体方法

  // 构造函数 参数由new实例化的时候传进来 类型...表示这个参数可选,然后用数组方式去取该参数,可选参数必须放在最后
  public Info(String param, String... param1) {
    this.defaultVar = param;
    this.defaultVar = param1.length > 0 ? param1[0] : this.defaultVar;
  }

  private static void log(ArrayList<Object> list) {
    list.forEach(
      array -> {
        System.out.println(array.toString());
      }
    );
  }

  private static void num() {
    int num = 12; // 32位有符号整数 整数数默认int
    int num1 = 0b100000001; // 2进制 0b表示是二进制 后面是位数
    int num2 = Integer.parseInt("123"); // Integer类
    int num3 = Integer.MAX_VALUE; // Integer类
    long longNumInfo = 1L;
    int num4 = (int) longNumInfo; // long转int

    long longNum = 1L; // 64位有符号整数 L标记位long
    long longNum1 = 0b100010101L; // 2进制 0b表示是二进制 后面是位数
    long longNum2 = Long.MAX_VALUE; // Long类

    short shortNum = 1; // 16位有符号整数 没有用s来标记
    short shortNum1 = Short.MAX_VALUE; // Short类

    byte byteNum = 1; // 8位有符号整数
    int numByteInfo = 128;
    byte byteNum1 = (byte) numByteInfo; // int转byte
    byte byteNum2 = (byte) Byte.MAX_VALUE; // Byte类

    float floatNum = 1F; // 单精度浮点数 32位
    float floatNum1 = 2.F;
    float floatNum2 = 3.0F;
    float floatNum3 = 0.3F;
    float floatNum4 = 0.4F;
    float floatNum5 = floatNum3 + floatNum4; // 精度缺失
    float floatNum6 = 0.22323f; // 小f
    float floatNum7 = Float.parseFloat("0.2323"); // Float类
    float floatNum8 = Float.MAX_VALUE;

    double doubleNum = 1D; // 双精度浮点数 64位 小数默认双精度
    double doubleNum1 = 2.D;
    double doubleNum2 = 3.0D;
    double doubleNum3 = 0.1D;
    double doubleNum4 = 0.2D;
    double doubleNum5 = doubleNum3 + doubleNum4; // 精度缺失
    double doubleNum6 = 0.22323; // 可以不加d
    double doubleNum7 = Double.parseDouble("0.2323"); // Double类
    double doubleNum8 = Double.MAX_VALUE;

    Number number = Integer.valueOf(999);
    int n = number.intValue();
    long l = number.longValue();
    long s = number.longValue();
    byte b = number.byteValue();
    float f = number.floatValue();
    double d = number.doubleValue();

    int mathNum = Math.abs(-100); // Math类
    Double mathRandom = Math.random(); // Math类中的随机数 [0,1)
    Random random = new Random(); // Random类
    int random1 = random.nextInt();
    int random2 = random.nextInt(10); // [0,10)
    Double random3 = random.nextDouble(); // [0,1)

    var list = new ArrayList<>();

    var ints = new ArrayList<>();
    ints.add(num);
    ints.add(num1);
    ints.add(num2);
    ints.add(num3);
    ints.add(num4);
    list.add(ints);

    var longs = new ArrayList<>();
    longs.add(longNum);
    longs.add(longNum1);
    longs.add(longNum2);
    list.add(longs);

    var shorts = new ArrayList<>();
    shorts.add(shortNum);
    shorts.add(shortNum1);
    list.add(shorts);

    var bytes = new ArrayList<>();
    bytes.add(byteNum);
    bytes.add(byteNum1);
    bytes.add(byteNum2);
    list.add(bytes);

    var floats = new ArrayList<>();
    floats.add(floatNum);
    floats.add(floatNum1);
    floats.add(floatNum2);
    floats.add(floatNum3);
    floats.add(floatNum4);
    floats.add(floatNum5);
    floats.add(floatNum6);
    floats.add(floatNum7);
    floats.add(floatNum8);
    list.add(floats);

    var doubles = new ArrayList<>();
    doubles.add(doubleNum);
    doubles.add(doubleNum1);
    doubles.add(doubleNum2);
    doubles.add(doubleNum3);
    doubles.add(doubleNum4);
    doubles.add(doubleNum5);
    doubles.add(doubleNum6);
    doubles.add(doubleNum7);
    doubles.add(doubleNum8);
    list.add(doubles);

    var nums = new ArrayList<>();
    nums.add(n);
    nums.add(l);
    nums.add(s);
    nums.add(b);
    nums.add(f);
    nums.add(d);
    list.add(nums);

    var others = new ArrayList<>();
    others.add(mathNum);
    others.add(mathRandom);
    others.add(random1);
    others.add(random2);
    others.add(random3);
    list.add(others);

    Info.log(list);
  }

  private static void str() throws UnsupportedEncodingException {
    char str = 'A'; // 16位无符号Java基元数据类型 它表示Unicode字符
    char str1 = '中';
    int str2 = 'A'; // A的ASCII编码
    char str3 = Character.toUpperCase('a'); // Character类
    String str4 = "abcd"; // 字符串使用String 并且是双引号
    String str5 = new String("中国"); // 每次创建新的String实例 推荐使用String.valueOf
    String str6 = null; // 注意null和空字符串不是一个意思,它们不相等
    String str7 = "";
    /*
      // 15+版本才支持
      String str8 = """
          多行字符
      """;
    */
    String str9 = String.valueOf(1); // String类
    StringBuilder str10 = new StringBuilder("2"); // StringBuilder类 为了解决循环中+连接字符串的效率和垃圾回收问题
    str10.append(str6).append(str7).append("3"); // null转为字符串"null"
    StringJoiner str11 = new StringJoiner(",", "begin ", " end"); // StringJoiner类 它可以提前加入开头和结尾的字符串 然后指定分割符
    str11.add("demo");
    str11.add("demo1");

    var list = new ArrayList<>();

    var strs = new ArrayList<>();
    strs.add(str);
    strs.add(str1);
    strs.add(str2);
    strs.add(str3);
    strs.add(str4);
    strs.add(str5);
    strs.add(str6);
    strs.add(str7);
    // strs.add(str8);
    strs.add(str9);
    strs.add(str10);
    strs.add(str11);
    list.add(strs);

    Info.log(list);
  }

  private static void flag() {
    boolean flag = true;
    boolean flag1 = false;
    boolean flag2 = 5 > 3; // true 基本类型比较值
    boolean flag3 = 5 == '5'; // false 不会类型转换
    String s1 = "hello";
    String s2 = "HELLO".toLowerCase();
    boolean flag4 = s1.equals(s2); // equals比较地址 不相等再比较一次值(只用与基本类型的包装类型和String)
    boolean flag5 = s1 == s2; // 两个引用类型比较地址
    boolean flag6 = Boolean.getBoolean("123"); // Boolean类

    var list = new ArrayList<>();

    var flags = new ArrayList<>();
    flags.add(flag);
    flags.add(flag1);
    flags.add(flag2);
    flags.add(flag3);
    flags.add(flag4);
    flags.add(flag5);
    flags.add(flag6);
    list.add(flags);

    Info.log(list);
  }

  private static void array() {
    /*
      []表示数组 []前面表示类型 数组所有元素初始化为默认值 整型都是0 浮点型是0.0 布尔型是false
      缺陷: 数组初始化后大小不可变;数组只能按索引顺序存取.
    */
    int[] ints = new int[5];
    String[] strs = new String[] { "1", "2" }; // 不给定长度 由后面初始化元素个数自动给定长度
    String[] strs1 = { "3", "4" }; // 简写
    String[] strs2 = new String[10]; // 引用类型初始化为默认值为null
    String[][][] multiArr = { { { "3", "4" } } }; // 多维数组
    /*
      Collection 表示集合 分为四类: List(有序列表集合),Set(值集合),Map(键值对集合),Queue(队列)
      这四个都是interface只定义了接口,并且都继承与Collection接口
      List常用实体类: ArrayList,LinkedList
      Set常用实体类: HashSet,TreeSet
      Map常用实体类: HashMap,TreeMap
      Queue常用实体类: ArrayDeque
    */
    var arrayList = new ArrayList<>();
    System.out.println(ints); // 不可以直接打印数组 打印的是数组在JVM的引用地址 要打印需要使用Arrays.toString/deepToString
    arrayList.add(Arrays.toString(ints)); // Arrays类能方便地操作数组
    arrayList.add(Arrays.toString(strs));
    arrayList.add(Arrays.toString(strs1));
    arrayList.add(Arrays.toString(strs2));
    arrayList.add(Arrays.deepToString(multiArr)); // 多维数组需要使用Arrays.deepToString

    Info.log(arrayList);
  }

  private static void modifier() {
    ArrayList<Object> list = new ArrayList<>(); // 使用类来定义变量
    var demo = new Info("first", "second"); // 使用var来定义类型 省略用类来定义类型

    var modifiers = new ArrayList<>();
    modifiers.add(demo.defaultVar);
    modifiers.add(demo.publicVar);
    modifiers.add(demo.privateVar);
    modifiers.add(demo.protectedVar);
    modifiers.add(Info.staticVar);
    modifiers.add(Info.constVar);
    list.add(modifiers);

    Info.log(list);
  }

  private static void controls() {
    // java中特殊用法

    /*      
      // switch
      // 15+版本才支持 switch使用->
      var fruit = "apple";
      String opt = switch (fruit) {
          case "apple" -> "apple";
          case "pear" -> "pear";
          case "mango" -> {
          System.out.println("Selected mango");
          System.out.println("Good choice!");
          yield "mango";
          }
          // 这两个是一个意思
          case "banana", "grape" -> "banana | grape";
          case "orange" -> {
          yield "orange";
          }
          // 不同类型的case不能一起使用
          // case "tomato" : {}
          default -> "";
      };
    */

    // foreach
    String[] strs1 = { "1", "2", "3", "4" }; // 简写
    for (String n : strs1) {
      System.out.print(n + ",");
    }
    System.out.println();
  }

  private static void specialClass() {
    class innerClass implements InnerInfo {

      public void innerFn() {
        // nothing
      }
    }
    new innerClass().innerFn();
    // 获取枚举常量值
    System.out.println(Color.RED);
    // 获取枚举常量值
    System.out.println(Weekday.MON);
    // 获取枚举的值数组
    System.out.println(Arrays.toString(Weekday.values()));
  }

  // main函数的参数由java命令运行时传入 如: java Info -version, 就可在ars数组去遍历找到该参数
  public static void main(String[] args) throws UnsupportedEncodingException {
    /*
      基本类型:
          整数类型：byte，short，int，long
          浮点数类型：float，double
          字符类型：char
          布尔类型：boolean
          这些基本类型都有相应的包装类型,包装类型也是引用类型
          基本类型不能为null,包装类型是可以的
          除了基本类型,其他都是引用类型也就是class
          equals比较地址,不相等的话,基本类型的包装类型和String类再比较一次值,所以equals比较引用类型,==比较基本类型
    */
    Info.num(); // 数字
    Info.str(); // 字符串
    Info.flag(); // 布尔
    Info.array(); // 数组
    Info.modifier(); // 修饰符
    Info.controls(); // 流程控制
    Info.specialClass(); // 特殊类

    InnerClass klass = new InnerClass();
    System.out.println(klass.getInfo());
  }
}

abstract class AbstractClass {

  public abstract String getInfo();
}

class InnerClass extends AbstractClass {

  public static void main(String[] args) {
    System.out.println("InnerClass main");
  }

  @Override
  public String getInfo() {
    System.out.println("info");
    return null;
  }
}

/**
 * interface 定义接口
 * 接口之间可以继承
 * 接口是被类实现的 它是抽象的意思 但与抽象类不同
 * 接口只能定义抽象方法 但是不能定义实例字段
 * class implements interface
 */
interface InnerInfo {
  public void innerFn();
}

/**
 * enum 定义枚举
 * 最后会编译为class
 */
enum Color {
  RED,
  GREEN,
  BLUE,
}

enum Weekday {
  MON(1, "星期一"),
  TUE(2, "星期二"),
  WED(3, "星期三"),
  THU(4, "星期四"),
  FRI(5, "星期五"),
  SAT(6, "星期六"),
  SUN(0, "星期日");

  public final int dayValue;
  private final String chinese;

  private Weekday(int dayValue, String chinese) {
    this.dayValue = dayValue;
    this.chinese = chinese;
  }

  @Override
  public String toString() {
    return this.chinese;
  }
}
/* record 不变类 jdk需要在16+
record Point(int x, int y) {

}
*/
