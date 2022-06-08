```java
public class Demo {
    static {
        // 静态代码块,只执行一次,并优先于主函数,主要用于给类初始化
        System.out.println("Demo static code");
    }

    public static void main() {
        // 主函数,运行时自执行函数
        System.out.println("Demo main code");
        NeedNewDemo demo = new NeedNewDemo();
    }

    {
        // 构造代码块,new的时候才会执行,但优先于构造函数执行
        System.out.println("Demo code");
    }

    public Demo() {
        // 这个Demo方法是Demo类的构造函数,new的时候才会执行,主要用于给对象初始化
        System.out.println("Demo construct code");
    }
}

public class NeedNewDemo {
    static {
        System.out.println("NeedNewDemo static code");
    }

    public static void main() {
        System.out.println("NeedNewDemo main code");
    }

    {
        System.out.println("NeedNewDemo code");
    }

    public NeedNewDemo() {
        System.out.println("NeedNewDemo construct code");
    }
}
```

- 上述代码执行顺序,Demo 为 main 被选为运行主函数
  - Demo static code
  - Demo main code
  - NeedNewDemo static code
  - NeedNewDemo code
  - NeedNewDemo construct code
  - 只有是选择运行的主函数才会主动运行
- 执行代码是都写在类里面嘛
  - 代码逻辑都是在 main 函数里面执行的或者静态代码块
- 中文输出乱码
  - 文件编码问题不一致
  - 编辑器终端输出编码不一致
- 如何解决一个不确定类型变量的问题
  - 使用泛型
  - 使用 var
- class 类 interface 接口 enum 枚举
- 类之间的关系
  - extends 和 implements
- 多行字符串和->(闭包)等新特性语法可以用在生产环境嘛,一般生产环境的版本较低
  - 不能!!!本地环境 jdk 必须和生产环境 jdk 保持一致,只能使用生产环境的版本特性
- 一个 spring boot 程序启动的每一个包的 main 函数都会运行嘛
  - 不是 @SpringBootApplication 注解来定义程序的主函数
- 一个包可以有多个 java 文件嘛
  - 可以 通过.\*或者具体的类名引入
- 一个 java 文件只能有一个类嘛
  - 不是只有一个类,但是只能有一个 public class/interface,这个公共类是可以被其他包引用的
  - 除了定义一个公共 public: 类/接口/枚举,还能定义类: 抽象/常量/默认(default),还能定义: 默认(default)interface/默认(default)enum
  - 未定义 public 的只能在同一个包进行访问(无需 import),其他包不能访问(import 也不可用)
  - 所以会 interface,enum,其他 class 都定义在 public class 中
- 如何使用 import
  - 同一个包下的 java 文件 class/interface 等不用互相 import,可以直接使用
  - 不同包下的需要 import 包.包.文件或者 import 包.包.\*
  - package 包.包.包 定义路径,没有 export 概念,定义了包路径,这个 java 文件中的 class/interface/enum 等等都可以访问
- import 包.包.\*好处和坏处
  - 好处 -- 快速的一次性导入,阅读代码更容易
  - 坏处 -- 依赖不够清晰,不确定到底是那个包,例如: com.demo.demo1.Event 和 com.demo.Event 之间存在直接命名冲突,可能编译报错
  - 需要合理运用.*,当冲突时可以在.*后再引入一个具体类
- java/spring/spring boot 经常使用的注解
  - 注解是一种元数据 可以将它理解为一种特殊的注释 它为我们在代码中添加信息提供了一种形式化的方法 可以理解为语法糖
  - spring
    - @Configuration、@Bean、@Import、@ImportResource、@Autowired
      - 作用：使用注解配置 Spring Bean。
      - 在类上加上 @Configuration 注解后，可以在类里面的方法上加上 @Bean 注解来定义 bean。然后可以在其他地方可以@Autowired 注入使用该方法返回值
      - 当有多个 Configuration 类时，可以使用 @Import 导入其他配置类。
      - 如果有 xml 配置的 bean，可以使用 @ImportResource 导入 xml 配置。
    - @Component、@Service、@Repository
      - 作用：都可以定义 bean，但略有区别。
      - @Service 一般用于修饰 service 层的组件，@Repository 一般用于 DAO 层组件，@Component 泛指组件。通常都可以用
        @Component，但是为了更好的维护性和扩展性，建议使用具体的注解进行区分。
    - @Controller、@RestController
      - 作用：在 Spring 中定义一个 web 访问地址。
      - @Controller 可以定义 html 访问地址。
      - @RestController 与 @Controller 类似，不同在于是 REST 风格的控制器。方法返回值经过 converter 转换后直接返回到前端，效果相当于 @Controller 和
        @ResponseBody 的合集。
    - @RequestMapping、@GetMapping、@PostMapping、@RequestParam、@RequestBody、@ResponseBody、@RequestHeader
      - 作用：主要用于 api 接口的地址，以及入参出参
      - @RequestMapping 用于定义 URI 路径。
      - @GetMapping、@PostMapping 分别对应 get 和 post。
      - @RequestParam、@RequestBody 分别是从 query 或 form data 中提取参数和从请求体中提取 json 参数
      - @ResponseBody 就是表示直接返回返回值，而不需要做转换以及模板渲染。
      - @RequestHeader 获取请求头
        - @RestControllerAdvice、@ControllerAdvice、@ExceptionHandler
          - 作用：在 Spring 中定义一个控制器增强
          - @RestControllerAdvice 是包含了@ControllerAdvice 的，它们都是注解于控制器增强类
          - 增强类内部使用@ExceptionHandler 来捕获异常
        - @Qualifier，@Primary
          - 作用：解决需要注入哪个 bean
          - @Qualifier 可以解决一个接口被多个实现，然后在注入这个接口时根据不同的 name 可以正确找到对应的实现方法
          - @Primary 是在依赖注入存在歧义时注入有@Primary 的方法
        - @Transactional
          - 作用：开启事务
        - @Override
          - 作用：标注方法,用来覆盖父类中的方法
  - spring boot
    - @ConfigurationProperties
      - 作用：读取配文文件信息
      - @ConfigurationProperties 读取 yml/properties 的配置，然后自动封装成实体类，将配置信息设置为类属性
  - lombok
    - @Getter、@Setter、@Data
      - 作用：因为 class 都是用 private 属性来保证安全性和合法性，所以需要手动写 setter 和 getter 方法，这个注解可自动完成该方法
      - @Getter、@Setter 自动完成 setter 和 getter
      - @Data 是一个方便使用的组合注解，是@ToString、@EqualsAndHashCode、@Getter、@Setter 和@RequiredArgsConstructor 的组合体
    - @Slf4j
      - 作用：快速使用 logback 日志 Logger 类实例
      - @Slf4j 等同于 private final Logger logger = LoggerFactory.getLogger(\*.class)
  - mybatis-spring
    - @MapperScan、@Mapper
      - 作用：整合 mybatis 的 mapper
      - @MapperScan 可以指定 mapper 类的包路径
      - @Mapper 可以让别的类引用 mapper 类，mapper 会执行 mapper.xml 的方法
  - mybatis-plus
    - @TableName、@TableField
      - 作用：定义数据库和 entity 的之间的关系
      - @TableName 定义表格名称和 schema
      - @TableField 定义字段名称
    - @TableId、@IdType
      - 作用：定义 id 字段
      - @TableId 定义 id 字段，@IdType 定义 id 自增
  - hibernate-validator
    - @Validated、@Valid
      - 作用：开启验证
      - @Validated：可以用在类型、方法和方法参数上。但是不能用在成员属性（字段）上
      - @Valid：可以用在方法、构造函数、方法参数和成员属性（字段）上
    - @NotNull -- 不能为 null
    - @NotBlank -- 不能为 null，空字符串
    - 其他暂不列举
- 好用的 Intellij IDEA 的插件和设置
  - 格式化等操作能否交给编辑器插件或者库
    - 格式化 -- Save Actions
    - 代码规范 -- SonarLint
  - 使用 vscode
    - 快捷键 -- vscode keymap
    - 主题 -- visual studio code theme
  - 中文 -- chinese language pack
  - spring 项目初始化 -- Spring Intilializr
  - 日志 -- ideolog
  - git -- GitToolBox
- 如何引入框架或库,日常引入的库
  - spring 是最基础的框架
  - spring boot 就是框架,它是在 spring 框架上再封装一层,能够更便捷开发
  - 使用 idea 插件来快捷创建 spring boot 项目,使用 maven 来管理项目依赖
  - pom.xml 中定义的 dependency 就是所需要的依赖
    - parent
      - spring boot 集合包: spring-boot-starter-parent
    - dependency
      - web 开发集合包: spring-boot-starter-web
      - test 集合包: spring-boot-starter-test
      - 实用工具包: lombok
        - 用一些简单注解能够实现 pojo 等功能
      - 数据库相关包
        - mysql: mysql-connector-java
        - postgresql: postgresql
      - 数据库操作集合包
        - 基础包: spring-boot-starter-jdbc
        - Mybatis-Plus: mybatis-plus-boot-starter
        - druid 连接池: druid-spring-boot-starter
        - JTA: spring-boot-starter-jta-atomikos
      - 数据校验: hibernate-validator
      - 日志: logback + slf4j, 包含在 starter-web 中
      - 处理 json: fastjson
- 如何初始化项目,初始化项目的基本流程
  - 使用 spring boot 创建模板项目
    - 选好 jdk 版本
    - 定义好组 id 和依赖 id
    - 定义好项目名称和包名称
  - 添加项目所需依赖到 pom.xml
  - 使用 maven 来构建依赖
  - 定义好包结构
    - common/
      - config/controller/entity/mapper/service/util/vo
    - 你的 project 名称/
      - controller/service
- 配置数据源到完成一个接口的整个流程,以及配置多数据源,以及配置多数据源文件目录划分
  - pom.xml 依赖需要预先加载 mybatis-plus-boot-starter 和对应数据的驱动包
  - resources 中的 application.yml/.properties 需要配置好多数据源的配置
  - 在 common 文件中定义好 mapper.xml 的扫描路径等数据库连接配置,mapper.xml 会被不同的路径隔开
    - 数据库 <--> mapper.xml
    - mapper.xml <--> mapperInterface
    - mapperInterface <--> service
    - 经过上面的绑定关系,就可在 service/controller 中使用 common 文件夹的 service,它会根据该关系它就能找到对应数据库在内部封装好的逻辑中执行 sql 语句
  - 在 controller 中抛出接口,内部只负责调用 service 方法
- 数据库字段和项目字段不一致,如何使用 baseMapper 方法
  - 定义 Entity 的@TableField 注解
  - postgresql 字段区分大小写问题,mybatis 自动将大写字段转为小写,导致使用 basemapper 方法报错,需要在设计表字段时就要规定好为小写或者是下划线连接
- 多种数据源操作的处理融合在一起怎么处理事务 -- jta,这里采用 atomikos 包,启动多数据源事务
- 组合注解,自定义注解 -- 通过自定义注解搭配拦截器达到 token 验证和统一响应格式
